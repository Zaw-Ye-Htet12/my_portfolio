"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, extend, useThree, useFrame, type ThreeElement } from "@react-three/fiber";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from "@react-three/rapier";
import { Environment, Lightformer, Text } from "@react-three/drei";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { motion } from "framer-motion";

extend({ MeshLineGeometry, MeshLineMaterial });

// Register meshline elements with R3F's type system
declare module "@react-three/fiber" {
    interface ThreeElements {
        meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
        meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
    }
}

// ── Error Boundary ──
interface EBProps {
    children: React.ReactNode;
}
interface EBState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<EBProps, EBState> {
    constructor(props: EBProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(): EBState {
        return { hasError: true };
    }
    componentDidCatch(error: Error) {
        console.error("Badge3D Error:", error);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                    <p>3D Badge could not load. WebGL may not be supported.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

// ── The Lanyard Band Component ──
function Band({ maxSpeed = 50, minSpeed = 10 }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps = {
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 2,
        linearDamping: 2,
    };

    const { width, height } = useThree((state) => state.size);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );

    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.7]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0],
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? "grabbing" : "grab";
            return () => {
                document.body.style.cursor = "auto";
            };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(
                state.camera
            );
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) =>
                ref.current?.wakeUp()
            );
            card.current?.setNextKinematicTranslation({
                x: vec.x - (dragged as THREE.Vector3).x,
                y: vec.y - (dragged as THREE.Vector3).y,
                z: vec.z - (dragged as THREE.Vector3).z,
            });
        }

        if (fixed.current) {
            [j1, j2].forEach((ref) => {
                if (!ref.current) return;
                if (!ref.current.lerped)
                    ref.current.lerped = new THREE.Vector3().copy(
                        ref.current.translation()
                    );
                const clampedDistance = Math.max(
                    0.1,
                    Math.min(
                        1,
                        ref.current.lerped.distanceTo(
                            ref.current.translation()
                        )
                    )
                );
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current?.geometry?.setPoints?.(curve.getPoints(32));

            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel(
                { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
                true
            );
        }
    });

    curve.curveType = "chordal";

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.35, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[0.7, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.05, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>

                <RigidBody
                    position={[1.4, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture(e.pointerId);
                            drag(
                                new THREE.Vector3()
                                    .copy(e.point)
                                    .sub(
                                        vec.copy(
                                            card.current.translation()
                                        )
                                    )
                            );
                        }}
                    >
                        {/* Card Front */}
                        <mesh>
                            <planeGeometry args={[1.6, 2.25]} />
                            <meshPhysicalMaterial
                                color="#0a0a0a"
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.5}
                                iridescence={1}
                                iridescenceIOR={1}
                                iridescenceThicknessRange={[0, 2400]}
                                side={THREE.FrontSide}
                            />
                        </mesh>

                        {/* Card Back */}
                        <mesh position={[0, 0, -0.01]}>
                            <planeGeometry args={[1.6, 2.25]} />
                            <meshPhysicalMaterial
                                color="#111111"
                                clearcoat={0.5}
                                roughness={0.5}
                                metalness={0.3}
                                side={THREE.BackSide}
                            />
                        </mesh>

                        {/* White Top Strip */}
                        <mesh position={[0, 0.98, 0.001]}>
                            <planeGeometry args={[1.6, 0.08]} />
                            <meshBasicMaterial
                                color="#ffffff"
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                        {/* "Z" Logo Block */}
                        <mesh position={[0, 0.45, 0.002]}>
                            <planeGeometry args={[0.5, 0.5]} />
                            <meshBasicMaterial
                                color="#ffffff"
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                        {/* Z Letter */}
                        <Text
                            position={[0, 0.45, 0.004]}
                            fontSize={0.35}
                            color="#000000"
                            anchorX="center"
                            anchorY="middle"
                        >
                            Z
                        </Text>

                        {/* Name */}
                        <Text
                            position={[0, -0.05, 0.003]}
                            fontSize={0.13}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.4}
                            textAlign="center"
                        >
                            ZAW YE HTET
                        </Text>

                        {/* Divider */}
                        <mesh position={[0, -0.2, 0.002]}>
                            <planeGeometry args={[0.8, 0.008]} />
                            <meshBasicMaterial
                                color="#333333"
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                        {/* Role */}
                        <Text
                            position={[0, -0.35, 0.003]}
                            fontSize={0.07}
                            color="#888888"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.4}
                            textAlign="center"
                        >
                            FULL-STACK DEVELOPER
                        </Text>

                        {/* Company */}
                        <Text
                            position={[0, -0.5, 0.003]}
                            fontSize={0.055}
                            color="#555555"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.4}
                            textAlign="center"
                        >
                            Location : BANGKOK (TH)
                        </Text>

                        <Text
                            position={[0, -0.6, 0.003]}
                            fontSize={0.055}
                            color="#777777"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.4}
                            textAlign="center"
                        >
                            React • TypeScript • Node • Next.js
                        </Text>

                        {/* Bottom Strip */}
                        <mesh position={[0, -0.75, 0.001]}>
                            <planeGeometry args={[1.6, 0.04]} />
                            <meshBasicMaterial
                                color="#ffffff"
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                        {/* Corner dots */}
                        <mesh position={[-0.65, -0.9, 0.001]}>
                            <circleGeometry args={[0.02, 16]} />
                            <meshBasicMaterial
                                color="#333333"
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                        <mesh position={[0.65, -0.9, 0.001]}>
                            <circleGeometry args={[0.02, 16]} />
                            <meshBasicMaterial
                                color="#333333"
                                side={THREE.DoubleSide}
                            />
                        </mesh>

                        {/* Metal clip */}
                        <mesh position={[0, 1.12, 0]}>
                            <boxGeometry args={[0.18, 0.12, 0.06]} />
                            <meshStandardMaterial
                                color="#aaaaaa"
                                metalness={0.95}
                                roughness={0.05}
                            />
                        </mesh>
                    </group>
                </RigidBody>
            </group>

            {/* Lanyard Band */}
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    args={[
                        {
                            color: "#ffffff",
                            resolution: new THREE.Vector2(width, height),
                            lineWidth: 1,
                            opacity: 0.85,
                        },
                    ]}
                    transparent
                    depthTest={false}
                />
            </mesh>
        </>
    );
}

// ── Loading Fallback inside Canvas ──
function CanvasFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#333" wireframe />
        </mesh>
    );
}

// ── Main Exported Component ──
export function Badge3D() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <section className="w-full py-24 flex justify-center">
                <div className="w-full max-w-4xl h-[600px] bg-card/30 border border-border animate-pulse" />
            </section>
        );
    }

    return (
        <section className="w-full py-16 px-4 md:px-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-5xl mx-auto"
            >
                {/* Section Header */}
                <div className="text-center mb-8">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] mb-2">
                        Interactive 3D
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tighter uppercase">
                        My Developer Badge
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground font-mono max-w-md mx-auto">
                        Physics-based 3D badge with React Three Fiber & Rapier.
                        Grab the card and drag it around!
                    </p>
                </div>

                {/* 3D Canvas */}
                <div className="relative w-full h-[550px] md:h-[650px] border border-border bg-black overflow-hidden">
                    {/* Corner decorations */}
                    <svg
                        className="absolute top-0 left-0 w-12 h-12 text-white/10 z-10"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M0 0 L25 0 L25 3 M0 0 L0 25 L3 25"
                            fill="currentColor"
                        />
                    </svg>
                    <svg
                        className="absolute top-0 right-0 w-12 h-12 text-white/10 z-10 rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M0 0 L25 0 L25 3 M0 0 L0 25 L3 25"
                            fill="currentColor"
                        />
                    </svg>
                    <svg
                        className="absolute bottom-0 left-0 w-12 h-12 text-white/10 z-10 -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M0 0 L25 0 L25 3 M0 0 L0 25 L3 25"
                            fill="currentColor"
                        />
                    </svg>
                    <svg
                        className="absolute bottom-0 right-0 w-12 h-12 text-white/10 z-10 rotate-180"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M0 0 L25 0 L25 3 M0 0 L0 25 L3 25"
                            fill="currentColor"
                        />
                    </svg>

                    <ErrorBoundary>
                        <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
                            <ambientLight intensity={Math.PI} />
                            <Suspense fallback={<CanvasFallback />}>
                                <Physics
                                    interpolate
                                    gravity={[0, -40, 0]}
                                    timeStep={1 / 60}
                                >
                                    <Band />
                                </Physics>
                            </Suspense>
                            <Environment background blur={0.75}>
                                <color
                                    attach="background"
                                    args={["black"]}
                                />
                                <Lightformer
                                    intensity={2}
                                    color="white"
                                    position={[0, -1, 5]}
                                    rotation={[0, 0, Math.PI / 3]}
                                    scale={[100, 0.1, 1]}
                                />
                                <Lightformer
                                    intensity={3}
                                    color="white"
                                    position={[-1, -1, 1]}
                                    rotation={[0, 0, Math.PI / 3]}
                                    scale={[100, 0.1, 1]}
                                />
                                <Lightformer
                                    intensity={3}
                                    color="white"
                                    position={[1, 1, 1]}
                                    rotation={[0, 0, Math.PI / 3]}
                                    scale={[100, 0.1, 1]}
                                />
                                <Lightformer
                                    intensity={10}
                                    color="white"
                                    position={[-10, 0, 14]}
                                    rotation={[
                                        0,
                                        Math.PI / 2,
                                        Math.PI / 3,
                                    ]}
                                    scale={[100, 10, 1]}
                                />
                            </Environment>
                        </Canvas>
                    </ErrorBoundary>

                    {/* Drag hint */}
                    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-end pb-8">
                        <p className="text-xs font-mono text-white/25 tracking-widest uppercase animate-pulse">
                            ↕ Drag to interact
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 px-2 text-xs font-mono text-muted-foreground/50">
                    <span>React Three Fiber + Rapier Physics</span>
                    <span>60 FPS • Interactive</span>
                </div>
            </motion.div>
        </section>
    );
}
