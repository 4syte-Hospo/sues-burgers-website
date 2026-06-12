/** Set via Netlify build env for static staging deploys (see netlify.toml). */
export const isStagingDeploy = import.meta.env.VITE_STAGING === "true";

export const stagingFormsUnavailableMessage =
  "Form submissions are not enabled on this preview site. To contact us or apply for a role, please visit suesburgers.com.au.";
