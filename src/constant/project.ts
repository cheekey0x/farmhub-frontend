export const CSocialCategory = [
  {
    name: "Twitter",
    placeHolder: "Ex: https://twitter.com/...",
    icon: "ri:twitter-x-line"
  },
  {
    name: "Instagram",
    placeHolder: "Ex: https://instagram.com/...",
    icon: "ph:instagram-logo"
  },
  {
    name: "Medium",
    placeHolder: "Ex: https://medium.com/...",
    icon: "hugeicons:medium"
  },
  {
    name: "Linkedin",
    placeHolder: "Ex: https://linkedin.com/in/...",
    icon: "ri:linkedin-fill"
  },
  {
    name: "Telegram",
    placeHolder: "Ex: https://t.me/...",
    icon: "fa-brands:telegram"
  },
  {
    name: "Discord",
    placeHolder: "Ex: https://discord.gg/...",
    icon: "ic:twotone-discord"
  },
  {
    name: "Youtube",
    placeHolder: "Ex: https://youtube.com/channel/...",
    icon: "mingcute:youtube-fill"
  },
  {
    name: "Github",
    placeHolder: "Ex: https://twitter.com/...",
    icon: "bxl:github"
  },
  {
    name: "Reddit",
    placeHolder: "Ex: https://reddit.com/user/...",
    icon: "ic:sharp-reddit"
  },
  {
    name: "Website",
    placeHolder: "Ex: https://...",
    icon: "dashicons:admin-site-alt3"
  }
];

export const CNFTTraitCategory = [
  "NFT Category1",
  "NFT Category2",
  "NFT Category3",
  "NFT Category4"
];

export const CTraitName = ["Trait1", "Trait2", "Trait3", "Trait4"];

export const CVestingType = [
  {
    name: "Exercisible",
    description:
      "* Allows for withdraw at anytime, but user is forced to forfeit their rewards if withdrawn early"
  },
  {
    name: "Vault",
    description:
      "* Total lock for the period of time selected, no way to withdraw or cancel"
  }
];

export enum EDODeployStatus {
  NONE = "NONE",
  FAILED = "FAILED",
  CREATE_APP_DEPLOYING = "CREATE_APP_DEPLOYING",
  ADD_APPDOMAIN_CONFIG = "ADD_APPDOMAIN_CONFIG",
  APP_SETTING_DEPLOYING = "APP_SETTING_DEPLOYING",
  DEPLOYED = "DEPLOYED"
}

export const convertStatusColor = (status: string) => {
  switch (status) {
    case EDODeployStatus.FAILED:
      return "#D93F3F";
    case EDODeployStatus.DEPLOYED:
      return "#81CD21";
    case EDODeployStatus.APP_SETTING_DEPLOYING:
      return "#EAD627";
    case EDODeployStatus.CREATE_APP_DEPLOYING:
      return "#EAD627";
    case EDODeployStatus.NONE:
      return "#ffffff";
    default:
      return "#ffffff";
  }
};

export const CPtCadence = [
  "Custom",
  "Anniversary"
  //  "Epoch"
];

export const CRewardType = ["Claim", "Anytime", "Airdrop"];

export const CAirdropInterval = [
  {
    title: "Daily",
    value: 24 * 60 * 60 * 1000
  },
  {
    title: "Weekly",
    value: 7 * 24 * 60 * 60 * 1000
  },
  {
    title: "Monthly",
    value: 30 * 24 * 60 * 60 * 1000
  },
  {
    title: "Annually",
    value: 365 * 24 * 60 * 60 * 1000
  }
];

export const CAnniversaryPeriod = [
  {
    title: "1 Month",
    value: 30 * 24 * 60 * 60 * 1000
  },
  {
    title: "3 Months",
    value: 3 * 30 * 24 * 60 * 60 * 1000
  },
  {
    title: "6 Months",
    value: 6 * 30 * 24 * 60 * 60 * 1000
  },
  {
    title: "9 Months",
    value: 9 * 30 * 24 * 60 * 60 * 1000
  }
];

export enum ESubscriptionPlan {
  HOBBYIST = "hobbyist",
  BUSINESS = "business",
  ENTERPRISE = "enterprise"
}

export const CSubscriptionPlanDetails = [
  {
    title: ESubscriptionPlan.HOBBYIST,
    monthly: 49,
    yearly: 588,
    includes: ["Single Policy ID", "Single Owner Seat", "Single Token Gate"]
  },
  {
    title: ESubscriptionPlan.BUSINESS,
    monthly: 69,
    yearly: 828,
    includes: [
      "03 Policy IDs + Free Initial ID",
      "03 Team Seats",
      "03 Token Gates + Free Member Gate"
    ]
  },
  {
    title: ESubscriptionPlan.ENTERPRISE,
    monthly: 124,
    yearly: 1488,
    includes: [
      "05 Policy IDs + Free Initial ID",
      "05 Team Seats",
      "05 Token Gates + Free Member Gate"
    ]
  }
];

export enum ESubscriptionPayPeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly"
}

export const billingMethod = [
  { name: "visa", address: "•••• 1234", title: "visa card" },
  { name: "wallet", address: "Addr238e....20e89cjuf", title: "wallet name" }
];

export enum EPaymentType {
  CARD = "card",
  WALLET = "wallet"
}
