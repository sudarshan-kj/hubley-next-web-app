const mailchimpTx = require("@mailchimp/mailchimp_transactional")(
  "hSy8Vce2dIJ7lT3DBOkXjw"
);
const EmailProvider = require("./emailProvider");

class MailChimpEmailProvider extends EmailProvider {
  constructor() {
    super("MailChimp");
  }

  async send() {
    console.log("Sending email message from mail chimp");
    return new Promise((resolve) =>
      resolve("ok email has been sent successfully")
    );
  }

  async run() {
    const response = await mailchimpTx.users.ping();
    return response;
  }
}

module.exports = MailChimpEmailProvider;
