import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { FORMSPREE_FORM_ID } from "../lib/constants";

export function PilotContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  const fieldClass =
    "w-full rounded-md border border-white/[0.1] bg-aegis-bg/80 px-4 py-2.5 text-sm text-aegis-white placeholder:text-aegis-slate-lo/50 focus:border-aegis-teal/50 focus:outline-none disabled:opacity-60";

  const validationClass = "mt-1.5 text-xs text-red-300";

  if (state.succeeded) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center p-7 text-center md:p-8">
        <CheckCircle className="mb-3 h-10 w-10 text-emerald-400" />
        <h3 className="text-lg font-semibold text-aegis-white">
          Thanks — we&apos;ll be in touch
        </h3>
        <p className="mt-2 max-w-xs text-sm text-aegis-slate">
          Expect a reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-7 md:p-8">
      <div className="space-y-5">
        <ValidationError
          errors={state.errors}
          className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300"
        />

        <input type="hidden" name="_subject" value="AEGIS pilot integration request" />

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-aegis-slate-hi">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={state.submitting}
            placeholder="Jane Smith"
            className={fieldClass}
          />
          <ValidationError prefix="Name " field="name" errors={state.errors} className={validationClass} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-aegis-slate-hi">
            Corporate email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={state.submitting}
            placeholder="you@company.com"
            className={fieldClass}
          />
          <ValidationError prefix="Email " field="email" errors={state.errors} className={validationClass} />
        </div>

        <div>
          <label htmlFor="sector" className="mb-1.5 block text-sm text-aegis-slate-hi">
            Platform sector
          </label>
          <select
            id="sector"
            name="sector"
            required
            disabled={state.submitting}
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select sector
            </option>
            <option value="Social media platform">Social media platform</option>
            <option value="Age-restricted e-commerce">Age-restricted e-commerce</option>
            <option value="Adult entertainment and online dating">
              Adult entertainment and online dating
            </option>
            <option value="Online betting and gambling">Online betting and gambling</option>
            <option value="Other regulated platform">Other regulated platform</option>
          </select>
          <ValidationError prefix="Sector " field="sector" errors={state.errors} className={validationClass} />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-aegis-teal px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-aegis-teal-bright disabled:cursor-wait disabled:opacity-70"
        >
          {state.submitting ? "Sending…" : "Request pilot integration"}
          {!state.submitting && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-aegis-slate-lo">
          We only use your details to respond to pilot enquiries. See our{" "}
          <a href="#privacy" className="text-aegis-teal-bright underline-offset-2 hover:underline">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
}
