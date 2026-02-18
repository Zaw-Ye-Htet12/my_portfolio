"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EducationContact() {
    return (
        <section id="contact" className="container mx-auto px-4 py-24 bg-secondary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Education Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        Education
                    </h2>
                    <Card className="border-border/50 bg-background/50 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-xl">KBTC University / NCC Education</CardTitle>
                            <p className="text-muted-foreground">Higher Diploma in Computing (L5DC)</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Specialized in Software Engineering, Database Design, and Network Security.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-8">Get in Touch</h2>
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-lg">
                            I am currently based in Bangkok, Thailand (DTV Visa Holder) and immediately available for new opportunities.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-muted-foreground">Bangkok, Thailand</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <Link href="tel:+66815900403" className="text-muted-foreground hover:text-primary transition-colors">
                                        +66 81 590 0403
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <Link href="mailto:zawyehtet1004@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        zawyehtet1004@gmail.com
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="w-full sm:w-auto mt-4" asChild>
                            <Link href="mailto:zawyehtet1004@gmail.com">
                                Say Hello
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
