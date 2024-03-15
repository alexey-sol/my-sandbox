import IToLocaleStringOptions from "Types/IToLocaleStringOptions";

// A class providing basic formatting for various data types.

export default class Formatter {

  /**
   * Formats the date according to the given options. If it's not provided with
   * options object, applies the default options.
   *
   * @param {Date} date - an instance of Date.
   * @param {string} [locales] - a string with a BCP 47 language tag.
   * @param {IToLocaleStringOptions} [options] - an object with options
   * according to which the date must be formatted.
   *
   * @returns {Date} - a formatted date.
   */
  public static formatDate(date: Date, locales?: string, options?:
  IToLocaleStringOptions): string {

    locales = locales || "ru";
    options = options || {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    };

    return date.toLocaleString(locales, options);
  }
}