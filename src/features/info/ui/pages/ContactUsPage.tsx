import { Link } from 'react-router-dom';
import { InfoPageLayout } from '../components/InfoPageLayout';

export const ContactUsPage = () => {
  return (
    <InfoPageLayout width="wide">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Support
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Contact Us
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: December 04, 2025</p>
        </div>

        <div className="info-prose">
          <p>
            We value your feedback, questions, and concerns. Please feel free to
            reach out to us through any of the following channels. Our team is
            here to assist you.
          </p>

          <h2>General Inquiries</h2>
          <p>
            For general inquiries, support requests, or information about our
            services, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Phone:</strong> +91 63615 62262
            </li>
            <li>
              <strong>Website Contact Form:</strong>{' '}
              <a
                href="https://arentzo.com/contact"
                target="_blank"
                rel="external nofollow noopener"
              >
                https://arentzo.com/contact
              </a>
            </li>
          </ul>

          <h2>Company Information</h2>
          <ul>
            <li>
              <strong>Company Name:</strong> VELORIA TECH (OPC) PRIVATE LIMITED
            </li>
            <li>
              <strong>Registered Address:</strong> 12-132, Main Road, Pedda
              Devaram Padu, Ammanabrolu, Ongole Mandal, Prakasham, 523180, Andhra
              Pradesh, India
            </li>
            <li>
              <strong>Country:</strong> India
            </li>
          </ul>

          <h2>Grievance Redressal</h2>
          <p>
            In accordance with the Information Technology (Intermediary
            Guidelines and Digital Media Ethics Code) Rules, 2021, we have
            appointed a Grievance Officer to address your concerns and
            complaints.
          </p>

          <h3>Grievance Officer Contact Information</h3>
          <ul>
            <li>
              <strong>Grievance Officer:</strong> VELORIA TECH (OPC) PRIVATE
              LIMITED
            </li>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Address:</strong> 12-132, Main Road, Pedda Devaram Padu,
              Ammanabrolu, Ongole Mandal, Prakasham, 523180, Andhra Pradesh,
              India
            </li>
            <li>
              <strong>Response Time:</strong> We will acknowledge your grievance
              within 24 hours and resolve it within 15 days of receipt.
            </li>
          </ul>

          <h3>How to File a Grievance</h3>
          <p>
            To file a grievance, please send an email to support@arentzo.com with
            the subject line &quot;Grievance&quot; and include the following
            information:
          </p>
          <ul>
            <li>Your full name and contact information</li>
            <li>Your account details (if applicable)</li>
            <li>A clear description of your grievance or complaint</li>
            <li>Any relevant documentation or evidence</li>
            <li>The date and time of the incident (if applicable)</li>
          </ul>

          <h2>Privacy and Data Protection Inquiries</h2>
          <p>
            For questions, concerns, or requests related to privacy, data
            protection, or your personal information, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Subject Line:</strong> Please include &quot;Privacy
              Inquiry&quot; or &quot;Data Protection Request&quot; in the subject
              line
            </li>
          </ul>
          <p>
            For detailed information about how we handle your personal data,
            please refer to our <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h3>Your Privacy Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
            <li>Lodge a complaint with data protection authorities</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at
            support@arentzo.com with the appropriate subject line.
          </p>

          <h2>Legal and Compliance Inquiries</h2>
          <p>
            For legal matters, compliance questions, or regulatory inquiries,
            please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Subject Line:</strong> Please include &quot;Legal
              Inquiry&quot; in the subject line
            </li>
          </ul>

          <h2>Business and Partnership Inquiries</h2>
          <p>
            For business partnerships, collaborations, or commercial inquiries,
            please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> admin@arentzo.com
            </li>
            <li>
              <strong>Subject Line:</strong> Please include &quot;Business
              Inquiry&quot; in the subject line
            </li>
          </ul>

          <h2>Media and Press Inquiries</h2>
          <p>
            For media inquiries, press releases, or interview requests, please
            contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Subject Line:</strong> Please include &quot;Media
              Inquiry&quot; in the subject line
            </li>
          </ul>

          <h2>Response Times</h2>
          <p>We strive to respond to all inquiries promptly:</p>
          <ul>
            <li>
              <strong>General Inquiries:</strong> Within 24-48 hours
            </li>
            <li>
              <strong>Support Requests:</strong> Within 24 hours
            </li>
            <li>
              <strong>Grievances:</strong> Acknowledgment within 24 hours,
              resolution within 15 days
            </li>
            <li>
              <strong>Privacy Requests:</strong> Within 30-45 days (as required
              by applicable law)
            </li>
            <li>
              <strong>Legal Inquiries:</strong> Within 3-5 business days
            </li>
          </ul>

          <h2>Operating Hours</h2>
          <p>Our customer support team is available:</p>
          <ul>
            <li>
              <strong>Days:</strong> Monday through Saturday
            </li>
            <li>
              <strong>Hours:</strong> 9:00 AM to 6:00 PM IST (Indian Standard
              Time)
            </li>
            <li>
              <strong>Emergency Support:</strong> For urgent matters, please
              call our phone number or send an email marked &quot;URGENT&quot;
              in the subject line
            </li>
          </ul>

          <h2>In-App Support</h2>
          <p>
            You can also reach out to us directly through the Arentzo mobile
            application:
          </p>
          <ul>
            <li>Use the in-app messaging feature to contact our support team</li>
            <li>Access the Help &amp; Support section in your account settings</li>
            <li>Report issues or provide feedback through the app</li>
          </ul>

          <h2>Social Media</h2>
          <p>
            You can also connect with us on social media platforms (if
            available):
          </p>
          <ul>
            <li>Follow us for updates, announcements, and news</li>
            <li>Send us direct messages for support inquiries</li>
            <li>Engage with our community and share your feedback</li>
          </ul>
          <p>
            Please note that for official inquiries, complaints, or legal
            matters, we recommend using the email addresses provided above
            rather than social media channels.
          </p>

          <h2>Feedback and Suggestions</h2>
          <p>
            We welcome your feedback, suggestions, and ideas for improving our
            platform. Please share your thoughts with us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@arentzo.com
            </li>
            <li>
              <strong>Subject Line:</strong> Please include &quot;Feedback&quot;
              or &quot;Suggestion&quot; in the subject line
            </li>
            <li>
              <strong>In-App:</strong> Use the feedback feature in the
              application
            </li>
          </ul>
          <p>
            Your feedback helps us improve our service and create a better
            experience for all users.
          </p>

          <h2>Frequently Asked Questions (FAQ)</h2>
          <p>
            Before contacting us, you may find answers to common questions in our{' '}
            <Link to="/faqs">Help Center</Link>. Please check our website or
            mobile application for frequently asked questions and answers.
          </p>

          <h2>Language Support</h2>
          <p>
            We primarily communicate in English and Hindi. If you prefer to
            communicate in another language, please let us know, and we will do
            our best to accommodate your request.
          </p>

          <h2>Important Notes</h2>
          <ul>
            <li>
              <strong>Security:</strong> For your security, please do not share
              sensitive information such as passwords, payment card details, or
              other confidential information through email or phone unless you
              are certain you are communicating with our official
              representatives.
            </li>
            <li>
              <strong>Verification:</strong> Our team will never ask for your
              password or request payment through unofficial channels. If you
              receive any suspicious communications, please report them to us
              immediately.
            </li>
            <li>
              <strong>Documentation:</strong> When contacting us about specific
              issues, please provide relevant documentation, screenshots, or
              transaction details to help us assist you more effectively.
            </li>
          </ul>

          <h2>Mailing Address</h2>
          <p>
            If you need to send us physical mail or documents, please use the
            following address:
          </p>
          <p>
            <strong>VELORIA TECH (OPC) PRIVATE LIMITED</strong>
            <br />
            12-132, Main Road, Pedda Devaram Padu
            <br />
            Ammanabrolu, Ongole Mandal
            <br />
            Prakasham, 523180
            <br />
            Andhra Pradesh, India
          </p>

          <h2>Thank You</h2>
          <p>
            Thank you for choosing Arentzo. We appreciate your trust in our
            platform and are committed to providing you with excellent customer
            service. We look forward to hearing from you and assisting you with
            any questions or concerns you may have.
          </p>
          <p>
            For more information about our company, please visit our{' '}
            <Link to="/about-us">About Us</Link> page.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  );
};
