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
  farm: icon('ph_farm'),
  land: icon('ph_land'),
  plant: icon('ph_plant'),
  financial: icon('ph_financial'),
  env_monitor: icon('ph_env_monitor'),
  crop: icon('ph_crop'),
  supplier: icon('ph_agri_supplier'),
  contract: icon('ph_contract'),
  card_pay: icon('ph_card_pay'),
  academy: icon('ph_academy'),
  chat: icon('ph_chat'),
  basic_data: icon('ph_basic_data'),
  team: icon('ph_team'),
  subscription: icon('ph_subscription'),
  system: icon('ph_system_setting'),
  platform: icon('ph_platform_setting')
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
            title: t('my_farm'),
            path: paths.dashboard.root,
            icon: ICONS.farm,
          },
          {
            title: t('land_transfer'),
            path: "paths.platform.root",
            icon: ICONS.land,
          },
          {
            title: t('manage_planting'),
            path: "paths.platform.root",
            icon: ICONS.plant,
          },
          {
            title: t('finacial_service'),
            path: "paths.platform.root",
            icon: ICONS.financial,
          },
          {
            title: t('env_monitoring'),
            path: "paths.platform.root",
            icon: ICONS.env_monitor,
          },
          {
            title: t('crop_storage'),
            path: "paths.platform.root",
            icon: ICONS.crop,
          },
          {
            title: t('agri_supplies'),
            path: "paths.platform.root",
            icon: ICONS.supplier,
          },
          {
            title: t('contact_manage'),
            path: "paths.platform.root",
            icon: ICONS.contract,
          },
          {
            title: t('receivable_payable'),
            path: "paths.platform.root",
            icon: ICONS.card_pay,
          },
          {
            title: t('agri_academy'),
            path: "paths.platform.root",
            icon: ICONS.academy,
          },
          {
            title: t('messaging'),
            path: "paths.platform.root",
            icon: ICONS.chat,
          },
          {
            title: t('team_manage'),
            path: "paths.platform.root",
            icon: ICONS.team,
          },
          {
            title: t('basic_data'),
            path: "paths.platform.root",
            icon: ICONS.basic_data,
          },
          {
            title: t('subscription'),
            path: "paths.platform.root",
            icon: ICONS.subscription,
          },
          {
            title: t('system_setting'),
            path: "paths.platform.root",
            icon: ICONS.system,
          },
          {
            title: t('platform_Setting'),
            path: paths.platform.root,
            icon: ICONS.platform,
            children: [
              {
                title: t('Admin'),
                path: paths.platform.admin,
                children: [
                  { title: t('Lvl 3-1'), path: paths.platform.admin },
                  { title: t('Lvl 3-2'), path: "paths.platform.login1" },
                  { title: t('Lvl 3-3'), path: "paths.platform.login2" },
                ]
              },
              { title: t('Login Page'), path: "paths.platform.login3" },
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
