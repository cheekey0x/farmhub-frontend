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
            children: [
              { title: t('land_transfer_dashboard'), path: "paths.platform.land_transfer_dashboard" },
              { title: t('land_transfer_primary'), path: "paths.platform.land_transfer_primary" },
              { title: t('land_transfer_secondary'), path: "paths.platform.land_transfer_secondary" },
            ],
          },
          {
            title: t('manage_planting'),
            path: "paths.platform.root",
            icon: ICONS.plant,
            children: [
              {
                title: t('planting_dashboard'),
                path: "paths.platform.planting_dashboard",
              },
              { title: t('planting_land_ledger'), path: "paths.platform.planting_land_ledger" },
              { title: t('planting_geo_mapping'), path: "paths.platform.planting_geo_mapping" },
              { title: t('planting_history_record'), path: "paths.platform.planting_history_record" },
              { title: t('plating_contracts'), path: "paths.platform.plating_contracts" },
              { title: t('plating_acceptance'), path: "paths.platform.plating_acceptance" }
            ],
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
            children: [
              { title: t('basic_land_operator'), path: "paths.platform.basic_land_operator" },
              { title: t('basic_agri_coop'), path: "paths.platform.basic_agri_coop" },
              { title: t('basic_planted_enterprises'), path: "paths.platform.basic_planted_enterprises" },
              { title: t('basic_divisions'), path: "paths.platform.basic_divisions" },
              {
                title: t('basic_land'),
                path: "paths.platform.basic_land",
                children: [
                  { title: t('basic_land_property'), path: "paths.platform.basic_land_property" },
                  { title: t('basic_land_types'), path: "paths.platform.basic_land_types" },
                ],
              },
              {
                title: t('basic_farm'),
                path: "paths.platform.basic_farm",
                children: [
                  { title: t('basic_farm_seeds'), path: "paths.platform.basic_farm_seeds" },
                  { title: t('basic_farm_fertilizers'), path: "paths.platform.basic_farm_fertilizers" },
                  { title: t('basic_farm_pesticides'), path: "paths.platform.basic_farm_pesticides" },
                  { title: t('basic_farm_planting_methods'), path: "paths.platform.basic_farm_planting_methods" },
                  { title: t('basic_farm_irrigation_methods'), path: "paths.platform.basic_farm_irrigation_methods" },
                  { title: t('basic_farm_tillage_operations'), path: "paths.platform.basic_farm_tillage_operations" },
                  { title: t('basic_farm_sowing_operations'), path: "paths.platform.basic_farm_sowing_operations" },
                  { title: t('basic_farm_fertilizing_operations'), path: "paths.platform.basic_farm_fertilizing_operations" },
                  { title: t('basic_farm_weed_pest_control'), path: "paths.platform.basic_farm_weed_pest_control" },
                  { title: t('basic_farm_harvesting_operations'), path: "paths.platform.basic_farm_harvesting_operations" },
                ],
              },
              {
                title:
                  t('basic_finance'),
                path: "paths.platform.basic_finance",
                children: [
                  { title: t('basic_finance_payment'), path: "paths.platform.basic_finance_payment" },
                  { title: t('basic_finance_insurance_types'), path: "paths.platform.basic_finance_insurance_types" },
                  { title: t('basic_finance_service_fee_account'), path: "paths.platform.basic_finance_service_fee_account" },
                ],
              },
            ],
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
                title: t('admin_setting'),
                path: paths.platform.admin,
                children: [
                  { title: t('Lvl 3-1'), path: paths.platform.admin },
                  { title: t('Lvl 3-2'), path: "paths.platform.login1" },
                  { title: t('Lvl 3-3'), path: "paths.platform.login2" },
                ]
              },
              { title: t('register_company'), path: "paths.platform.register" },
              { title: t('subscription'), path: "paths.platform.subscription" },
              { title: t('firstpage_settting'), path: "paths.platform.firstpage_settting" },
              { title: t('sms_api_setting'), path: "paths.platform.sms_api_setting" }
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
