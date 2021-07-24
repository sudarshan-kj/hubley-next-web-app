/**
 * This is meant to act like an abstract class. Do not instantiate this class directly.
 */
class EmailProvider {
  constructor(emailProviderName) {
    this.emailProviderName = emailProviderName;
  }

  send() {
    throw new Error(
      `No implementation of send() method found in class: ${this.constructor.name}`
    );
  }
}

module.exports = EmailProvider;
