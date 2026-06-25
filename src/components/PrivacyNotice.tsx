import { CONTACT_EMAIL } from "../lib/constants";

export function PrivacyNotice() {
  return (
    <section id="privacy" className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h3 className="text-sm font-semibold text-aegis-white">Privacy notice</h3>
        <p className="mt-3 text-xs leading-relaxed text-aegis-slate-lo">
          When you submit the pilot request form, we collect your name, corporate
          email address, and platform sector solely to respond to your enquiry and
          discuss a potential integration. Submissions are processed by Formspree
          on our behalf and are not used for marketing. You may request deletion
          of your data by emailing{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-aegis-teal-bright underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . We do not sell or share your information with third parties except as
          required to operate this website and deliver our response.
        </p>
      </div>
    </section>
  );
}
