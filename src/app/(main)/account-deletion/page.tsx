import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPageLayout } from '@/features/info/ui/components/InfoPageLayout';

export const metadata: Metadata = {
  title: 'Delete your Arentzo account',
  description: 'Delete your Arentzo account in the app or request account and personal data deletion without installing the app.',
};

export default function AccountDeletionPage() {
  return (
    <InfoPageLayout width="narrow">
      <article className="info-prose space-y-6">
        <h1>Delete your Arentzo account</h1>
        <p>Arentzo is operated by VELORIA TECH (OPC) PRIVATE LIMITED. You can permanently delete your account and associated personal data using either option below.</p>
        <section>
          <h2>Delete your account in the app</h2>
          <ol>
            <li>Sign in to the Arentzo app.</li>
            <li>Open Profile, then Settings, then Delete account.</li>
            <li>Read the deletion information, type DELETE, and confirm Delete account.</li>
          </ol>
          <p>If you signed in with Apple, confirm your Apple ID when prompted. Complete or cancel active rentals and subscriptions before deleting your account.</p>
        </section>
        <section>
          <h2>Request deletion without the app</h2>
          <p>You do not need to install or sign in to the app to submit a request. Email us from the email address registered to your Arentzo account. Include your registered email address and state that you want your account and associated personal data deleted. Do not send your password or identity documents.</p>
          <p><a href="mailto:support@arentzo.com?subject=Arentzo%20account%20deletion%20request">Request account deletion: support@arentzo.com</a></p>
          <p>We verify ownership before processing your request and contact you if further information is needed. If a rental, subscription or dispute needs to be resolved first, we explain the required next step.</p>
        </section>
        <section>
          <h2>What happens to your data</h2>
          <p>Deletion removes sign-in access and deletes or permanently anonymizes your profile, saved addresses, identity documents, uploaded personal files, bank details and provider listings. Account deletion cannot be undone.</p>
          <p>Transaction and dispute records that must be kept for legal, tax, fraud prevention or dispute resolution purposes may be retained for the applicable required period. These records are not used to keep your account active.</p>
        </section>
        <p>Read our <Link href="/privacy-policy">Privacy Policy</Link> for more information.</p>
      </article>
    </InfoPageLayout>
  );
}
