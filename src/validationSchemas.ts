import * as Yup from "yup";
import { getI18n } from "react-i18next";
import { before, sameDay } from "./shared";

export const jobValidationSchema = Yup.object().shape({
  description: Yup.string().required(),
  start_time: Yup.date().required(
    getI18n().t("validation.field_required", { field: getI18n().t("start_time") })
  ),
  end_time: Yup.date()
    .required(getI18n().t("validation.field_required", { field: getI18n().t("end_time") }))
    .when("start_time", (start, schema) => {
      return schema.test({
        test: (end: any) => before(start, end, true),
        message: getI18n().t("event.validation.start_before_end"),
      });
    })
    .when("start_time", (start, schema) => {
      return schema.test({
        test: (end: Date) => sameDay(start, end),
        message: getI18n().t("event.validation.same_day"),
      });
    }),
  location: Yup.string().required()
});
