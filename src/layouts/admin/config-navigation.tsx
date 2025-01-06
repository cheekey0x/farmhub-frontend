import { useMemo } from "react";
import SvgColor from "src/components/svg-color";
import { paths } from "src/routes/paths";
import { useTranslate } from 'src/locales';

// ...................................

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icon/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  dashboard: icon("ic_dashboard"),
  delegator: icon("delegator"),
  project: icon("policy"),
  account: icon("account"),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics')
};
// ...................................

export function useNavData() {
  const { t } = useTranslate();

  // ...................................
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: "",
        items: [
          {
            title: "dashboard",
            path: paths.dashboard.root,
            icon: ICONS.dashboard
          },
          // {
          //   title: "Delegators",
          //   path: paths.delegators.root,
          //   icon: ICONS.delegator
          // },
          // {
          //   title: "Projects",
          //   path: paths.projects.root,
          //   icon: ICONS.project
          // },
          // {
          //   title: "Account-setting",
          //   path: paths.account.root,
          //   icon: ICONS.account
          // },
          {
            title: t('Platform_Setting'),
            path: paths.platform.root,
            icon: ICONS.banking,
            children: [
              { title: t('Admin'), path: paths.platform.admin },
              { title: t('Login Page'), path: paths.platform.login },
              { title: t('Register'), path: paths.platform.register }
            ],
          },
        ]
      }
    ],
    [t]
  );
  // ...................................

  return data;
}
