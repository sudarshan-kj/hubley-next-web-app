const MailChimpEmailProvider = require("./mailChimpEmailProvider");
class EmailActions {
  constructor() {
    this.from = "from";
    this.to = "kjsudi@gmail.com";
    this.composed = null;
    this.errors = [];
  }

  compose() {
    this.composed = true;
  }

  hasErrors() {}

  hasAttachments() {}

  async send() {
    //send the composed email using an email provider
    if (!this.composed) throw new Error("Compose an email before sending");
    const emailProvider = new MailChimpEmailProvider();
    try {
      const run = await emailProvider.run();
      const response = await emailProvider.send();
      console.log("Response from send is", response);
    } catch {
      console.error("Unable to send email. Error occurred", e);
    }
  }
}

module.exports = EmailActions;
