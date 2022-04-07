import { getI18n } from "react-i18next";
import * as Yup from "yup";
import { GeoCode, User } from "./interfaces";

/**
 * @param {string} geocode | comma-seperated latitude and longitude
 * @returns Object with lat and lng for geo_coding
 */
export const latlngforMap = (geo_code: string):GeoCode => {
  const geo_coords: Array<string> = geo_code.split(",");
  const lat = parseFloat(geo_coords[0]);
  const lng = parseFloat(geo_coords[1]);
  return { lat: lat, lng: lng };
};

/**
 * Returns the localized short day name from index, i.e. 0 = Mon
 * @param {number} index
 * @returns translated day name
 */
export const getDayByIndex = (index: number):string => {
  return getI18n().t("dates.abbr_day_names")[index];
};

/**
 * Return formatted name string
 * @param {object}
 * @returns string with last name and first name, i.e. Smith, John
 */
export const getDisplayName = (user: User|null):string => {
  if(!user) return ''
  const { first_name, last_name } = user
  return `${first_name} ${last_name}`;
};

/**
 * calculate duration between 2 dates in full hours
 * @param {date} start
 * @param {date} end
 * @returns number
 */
export function durationInMs(start:Date, end:Date):number {
  return end.getTime() - start.getTime();
}

/**
 * checks max allowed duration in Hour between two dates
 * @param {date} start
 * @param {date} end
 * @param {number} durationHour
 * @returns boolean
 */
export function checkMaxDurationInHour(start:Date, end:Date, durationHour:number):boolean {
  return (
      durationInMs(start, end) < durationHour*60*60*1000
  );
}

/**
 * set a cookie
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
export function setCookie(name: string, value: string, days:number = 0) {
  var expires: string = "";
  if (days) {
    var date: Date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * get a cookie value
 * @param {string} name
 * @returns value or null
 */
export function getCookie(name:string):string|null {
  var nameEQ: string = name + "=";
  var ca: Array<string> = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c: string = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

var yesterday: Date = new Date();
yesterday.setDate(yesterday.getDate() - 1);

/**
 *
 * @param {string} url
 * @returns url without https or http
 */
export function slimURL(url:string):string {
  return url.replace(/(^\w+:|^)\/\//, '');
}

const pwreg = /[*@!#%&()^~{}?]+/
/**
 * @param t i18n translation object
 * @returns validation schema
 */
export const passwordValidationSchema = (t:any):any => Yup.object().shape({
  default_password: Yup.string().required(
    t("validation.field_required", { field: t("passwords.default_password") })
  ),
  password: Yup.string().required(
    t("validation.field_required", { field: t("passwords.password") })
  ).min(8, t("passwords.password") + t("passwords.password_length")).matches(pwreg, t("passwords.password") + t("passwords.password_requirements")),
  password_confirmation: Yup.string().required(
    t("validation.field_required", {
      field: t("passwords.password_confirmation"),
    })
  ).oneOf([Yup.ref("password"), null], t("passwords.must_match")),
});
