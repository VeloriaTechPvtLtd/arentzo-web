import React from 'react';
import { Navbar } from '../../../../shared/components/layout/Navbar';
import { Footer } from '../../../../shared/components/layout/Footer';
import { Link } from 'react-router-dom';

export const AboutUsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-primary">About Us</h1>
                        <p className="text-muted-foreground">Last updated: December 04, 2025</p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>Welcome to Arentzo, a revolutionary rental marketplace platform that connects service providers with renters, making it easy to rent and share items, products, and services.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Company</h2>
                        <p><strong>VELORIA TECH (OPC) PRIVATE LIMITED</strong> is the parent company that owns and operates the Arentzo platform. We are committed to creating a seamless, secure, and user-friendly rental marketplace that benefits both service providers and renters.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Company Information</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Company Name:</strong> VELORIA TECH (OPC) PRIVATE LIMITED</li>
                            <li><strong>Registered Address:</strong> 12-132, Main Road, Pedda Devaram Padu, Ammanabrolu, Ongole Mandal, Prakasham, 523180, Andhra Pradesh, India</li>
                            <li><strong>Country:</strong> India</li>
                            <li><strong>Website:</strong> <a href="https://arentzo.com" target="_blank" rel="external nofollow noopener" className="text-primary hover:underline">https://arentzo.com</a></li>
                        </ul>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
                        <p>At Arentzo, our mission is to transform the way people access and share resources by creating a trusted, efficient, and accessible rental marketplace. We believe in promoting sustainable consumption, enabling economic opportunities for service providers, and providing convenient access to items and services for renters.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What We Do</h2>
                        <p>Arentzo is a comprehensive rental marketplace platform that facilitates rental transactions between service providers and renters. Our platform enables:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Service Providers:</strong> Individuals and businesses can list their items, products, or services for rent, manage their listings, set pricing and availability, and connect with potential renters.</li>
                            <li><strong>Renters:</strong> Users can browse, search, and discover rental items and services, book rentals, make secure payments, and manage their rental history.</li>
                            <li><strong>Secure Transactions:</strong> We provide a secure payment processing system, transaction management, and invoice generation for all rental transactions.</li>
                            <li><strong>Communication:</strong> Built-in messaging and communication tools to facilitate interaction between service providers and renters.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Platform Features</h2>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">For Service Providers</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Easy listing creation and management</li>
                            <li>Flexible pricing and availability settings</li>
                            <li>Booking management and calendar tools</li>
                            <li>Payment processing and transaction records</li>
                            <li>Analytics and performance insights</li>
                            <li>Customer communication tools</li>
                            <li>Document verification and profile management</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">For Renters</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Comprehensive search and discovery tools</li>
                            <li>Advanced filtering and category browsing</li>
                            <li>Secure booking and payment system</li>
                            <li>Rental history and order tracking</li>
                            <li>Review and rating system</li>
                            <li>Messaging and communication features</li>
                            <li>Subscription plans for recurring rentals</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Values</h2>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Trust and Safety</h3>
                        <p>We prioritize the safety and security of our users. We implement robust verification processes, secure payment systems, and comprehensive user protection measures to ensure a trustworthy marketplace environment.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">User-Centric Approach</h3>
                        <p>We continuously improve our service based on user feedback and strive to provide an intuitive, accessible, and enjoyable experience for all users.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Transparency</h3>
                        <p>We believe in clear communication, transparent pricing, and honest business practices. We provide comprehensive information about our services, policies, and terms to help users make informed decisions.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Innovation</h3>
                        <p>We are committed to leveraging technology to enhance the rental experience, improve platform functionality, and introduce innovative features that benefit our community.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Sustainability</h3>
                        <p>By promoting the sharing economy and rental marketplace, we contribute to sustainable consumption practices, reducing waste and promoting resource efficiency.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Commitment</h2>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Data Privacy and Security</h3>
                        <p>We are committed to protecting your privacy and personal information. We implement industry-standard security measures and comply with applicable data protection laws. For detailed information about how we handle your data, please refer to our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Customer Support</h3>
                        <p>We provide dedicated customer support to assist users with inquiries, issues, and concerns. Our support team is available through multiple channels, including email, phone, and in-app messaging.</p>

                        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Continuous Improvement</h3>
                        <p>We continuously work to improve our platform, add new features, enhance user experience, and address user feedback. Your suggestions and feedback help us build a better service.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Technology and Infrastructure</h2>
                        <p>Our platform is built using modern, secure, and scalable technology to ensure reliable performance and data security. We utilize:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Secure cloud infrastructure for data storage and processing</li>
                            <li>Encrypted payment processing systems compliant with PCI DSS standards</li>
                            <li>Real-time analytics and monitoring tools</li>
                            <li>Mobile-responsive design for seamless access across devices</li>
                            <li>Advanced security measures to protect user data</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Compliance and Legal</h2>
                        <p>We operate in compliance with applicable laws and regulations, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Information Technology Act, 2000 (India)</li>
                            <li>Consumer Protection Act, 2019 (India)</li>
                            <li>Data protection and privacy regulations</li>
                            <li>Payment and financial regulations</li>
                            <li>Platform intermediary guidelines</li>
                        </ul>
                        <p>For detailed information about our legal compliance and user rights, please refer to our <Link to="/terms-and-conditions" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Team</h2>
                        <p>Our team consists of dedicated professionals committed to building and maintaining a world-class rental marketplace platform. We work together to ensure the best possible experience for our users.</p>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
                        <p>We value your feedback, questions, and suggestions. If you would like to get in touch with us, please visit our <Link to="/contact-us" className="text-primary hover:underline">Contact Us</Link> page or reach out to us through the following channels:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Email:</strong> support@arentzo.com</li>
                            <li><strong>Phone:</strong> +91 95059 62262</li>
                            <li><strong>Website:</strong> <a href="https://arentzo.com/contact" target="_blank" rel="external nofollow noopener" className="text-primary hover:underline">https://arentzo.com/contact</a></li>
                            <li><strong>Address:</strong> 12-132, Main Road, Pedda Devaram Padu, Ammanabrolu, Ongole Mandal, Prakasham, 523180, Andhra Pradesh, India</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Thank You</h2>
                        <p>Thank you for choosing Arentzo. We appreciate your trust in our platform and are committed to providing you with an exceptional rental marketplace experience. Together, we can build a thriving community of service providers and renters.</p>
                        <p>If you have any questions, concerns, or feedback, please don't hesitate to <Link to="/contact-us" className="text-primary hover:underline">contact us</Link>. We're here to help!</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
