import {
  Stack,
  Divider,
  IconButton,
  Typography,
  SvgIcon,
  Box
} from "@mui/material";
import Iconify from "src/components/iconify";
import { varHover } from "src/components/animate";
import { m } from "framer-motion";
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from "@mui/material";

const CSocialLinks = [
  {
    name: "Twitter",
    link: "https://x.com/YieldLab",
    icon: "ri:twitter-x-line"
  },
  {
    name: "Medium",
    link: "https://medium.com/@anonymous_78184/subscribe",
    icon: "hugeicons:medium"
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UCpDMkx7unlklmaOkVp6Kl2Q",
    icon: "mingcute:youtube-fill"
  }
];


export default function LandingFooter() {
  const popover = usePopover();
  const theme = useTheme();

  const handleMarkComplete = () => {
    popover.onClose();
    console.info('MARK COMPLETE',);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE');
  };

  const handleEdit = () => {
    popover.onClose();
    console.info('EDIT');
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE');
  };

  return (
    <Stack
      mt={5}
      py={2}
      px={8}
      sx={{
        backgroundColor: theme.palette.background.main,
        backgroundImage: "url('/assets/images/landing/pattern-bg.png')",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      }}>
      {/* <Divider sx={{ my: 2 }} /> */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
      // my={1}
      >
        {/* <Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            justifyContent="center"
            alignItems="center"
            gap={5}
          />
          <Stack direction="row" gap={2} sx={{ mt: { xs: 10, md: 0 } }}>
            {CSocialLinks.map((socialItem) => (
              <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                key={socialItem.name}
                onClick={() =>
                  setTimeout(() => window.open(socialItem.link, "_blank"), 1000)
                }
                variants={varHover(1.03)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 1,
                  p: 1,
                  background: `linear-gradient(0deg, rgba(165, 165, 165, 0), rgba(165, 165, 165, 0)),
                 linear-gradient(151.32deg, rgba(255, 255, 255, 0.08) 8.55%, rgba(52, 52, 60, 0.08) 155.47%)`,
                  boxShadow: "2px 2px 4px 0px #FFFFFF40 inset",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#0000008c"
                  }
                }}
              >
                <Iconify width={20} icon={socialItem.icon} />
              </IconButton>
            ))}
          </Stack>
        </Stack> */}
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="caption" color="#fff">
            © {new Date().getFullYear()}. 飞鸟科技FarmHub智慧农业系统 - All Rights Reserved.
          </Typography>
        </Stack>
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
          <Box sx={{ width: "32px", height: "32px", cursor: "pointer" }}>
            <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_138_351)">
                <rect x="4" width="42" height="42" rx="21" fill="#236634" shapeRendering="crispEdges" />
                <rect x="4.5" y="0.5" width="41" height="41" rx="20.5" stroke="#D3F0DB" shapeRendering="crispEdges" />
                <path d="M26.1137 10.1667C27.3324 10.1699 27.951 10.1764 28.4851 10.1916L28.6952 10.1992C28.9379 10.2078 29.1773 10.2187 29.4666 10.2317C30.6192 10.2858 31.4057 10.4678 32.0958 10.7354C32.8108 11.0106 33.4132 11.3832 34.0155 11.9845C34.5666 12.5259 34.9929 13.181 35.2646 13.9042C35.5322 14.5942 35.7142 15.3807 35.7683 16.5345C35.7813 16.8227 35.7922 17.0621 35.8008 17.3058L35.8073 17.516C35.8236 18.049 35.8301 18.6676 35.8322 19.8863L35.8333 20.6945V22.1137C35.836 22.9038 35.8277 23.694 35.8084 24.484L35.8019 24.6942C35.7932 24.9379 35.7824 25.1773 35.7694 25.4655C35.7152 26.6192 35.5311 27.4047 35.2646 28.0958C34.9929 28.819 34.5666 29.4741 34.0155 30.0155C33.4741 30.5666 32.819 30.9929 32.0958 31.2646C31.4057 31.5322 30.6192 31.7142 29.4666 31.7683L28.6952 31.8008L28.4851 31.8073C27.951 31.8225 27.3324 31.8301 26.1137 31.8322L25.3055 31.8333H23.8874C23.0969 31.8361 22.3063 31.8278 21.516 31.8084L21.3058 31.8019C21.0487 31.7922 20.7915 31.781 20.5345 31.7683C19.3818 31.7142 18.5953 31.5322 17.9042 31.2646C17.1814 30.9927 16.5266 30.5664 15.9856 30.0155C15.4341 29.4742 15.0074 28.8191 14.7354 28.0958C14.4678 27.4057 14.2858 26.6192 14.2317 25.4655L14.1992 24.6942L14.1937 24.484C14.1738 23.694 14.1647 22.9039 14.1667 22.1137V19.8863C14.1637 19.0961 14.1716 18.306 14.1905 17.516L14.1981 17.3058C14.2067 17.0621 14.2176 16.8227 14.2306 16.5345C14.2847 15.3807 14.4667 14.5953 14.7343 13.9042C15.007 13.1807 15.4344 12.5255 15.9867 11.9845C16.5274 11.4337 17.1818 11.0074 17.9042 10.7354C18.5953 10.4678 19.3807 10.2858 20.5345 10.2317C20.8227 10.2187 21.0632 10.2078 21.3058 10.1992L21.516 10.1927C22.306 10.1734 23.0961 10.1651 23.8863 10.1677L26.1137 10.1667ZM25 15.5833C23.5634 15.5833 22.1857 16.154 21.1698 17.1698C20.154 18.1856 19.5833 19.5634 19.5833 21C19.5833 22.4366 20.154 23.8143 21.1698 24.8302C22.1857 25.846 23.5634 26.4167 25 26.4167C26.4366 26.4167 27.8143 25.846 28.8302 24.8302C29.846 23.8143 30.4167 22.4366 30.4167 21C30.4167 19.5634 29.846 18.1856 28.8302 17.1698C27.8143 16.154 26.4366 15.5833 25 15.5833ZM25 17.75C25.4268 17.7499 25.8494 17.8339 26.2438 17.9972C26.6381 18.1604 26.9964 18.3998 27.2983 18.7015C27.6001 19.0032 27.8395 19.3615 28.0029 19.7558C28.1663 20.15 28.2505 20.5727 28.2505 20.9994C28.2506 21.4262 28.1666 21.8489 28.0034 22.2432C27.8401 22.6375 27.6008 22.9959 27.299 23.2977C26.9973 23.5995 26.639 23.839 26.2448 24.0024C25.8505 24.1658 25.4279 24.2499 25.0011 24.25C24.1391 24.25 23.3125 23.9076 22.703 23.2981C22.0935 22.6886 21.7511 21.8619 21.7511 21C21.7511 20.138 22.0935 19.3114 22.703 18.7019C23.3125 18.0924 24.1391 17.75 25.0011 17.75M30.6886 13.9583C30.3294 13.9583 29.985 14.101 29.731 14.3549C29.4771 14.6089 29.3344 14.9533 29.3344 15.3125C29.3344 15.6716 29.4771 16.0161 29.731 16.27C29.985 16.524 30.3294 16.6667 30.6886 16.6667C31.0477 16.6667 31.3922 16.524 31.6461 16.27C31.9001 16.0161 32.0427 15.6716 32.0427 15.3125C32.0427 14.9533 31.9001 14.6089 31.6461 14.3549C31.3922 14.101 31.0477 13.9583 30.6886 13.9583Z" fill="#F1F1F1" />
              </g>
              <defs>
                <filter id="filter0_d_138_351" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.2 0 0 0 0 0.203922 0 0 0 0 0.792157 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_138_351" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_138_351" result="shape" />
                </filter>
              </defs>
            </svg>
          </Box>

          {/* <Box onClick={popover.onOpen} sx={{ width: "32px", height: "32px", marginLeft: "8px", cursor: "pointer" }}> */}
          <Box sx={{ width: "32px", height: "32px", marginLeft: "8px", cursor: "pointer" }}>
            <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_138_354)">
                <rect x="4" width="42" height="42" rx="21" fill="#236634" shapeRendering="crispEdges" />
                <rect x="4.5" y="0.5" width="41" height="41" rx="20.5" stroke="#D3F0DB" shapeRendering="crispEdges" />
                <path d="M25.0011 10.1667C30.9843 10.1667 35.8344 15.0167 35.8344 21C35.8344 26.9832 30.9843 31.8333 25.0011 31.8333C23.0866 31.8366 21.2057 31.33 19.5519 30.3654L14.1721 31.8333L15.6368 26.4513C14.6715 24.797 14.1644 22.9153 14.1678 21C14.1678 15.0167 19.0178 10.1667 25.0011 10.1667ZM21.3091 15.9083L21.0924 15.917C20.9523 15.9266 20.8155 15.9634 20.6894 16.0253C20.572 16.092 20.4647 16.1751 20.3709 16.2723C20.2409 16.3947 20.1673 16.5009 20.0882 16.6038C19.6875 17.1248 19.4717 17.7644 19.475 18.4217C19.4772 18.9525 19.6158 19.4692 19.8325 19.9524C20.2756 20.9296 21.0047 21.9642 21.9667 22.9229C22.1985 23.1537 22.426 23.3855 22.6708 23.6011C23.8662 24.6534 25.2906 25.4124 26.8308 25.8176L27.4462 25.9118C27.6466 25.9227 27.847 25.9075 28.0485 25.8977C28.364 25.8811 28.672 25.7957 28.9509 25.6475C29.0927 25.5742 29.2311 25.4947 29.3658 25.4092C29.3658 25.4092 29.4117 25.3781 29.5013 25.3117C29.6475 25.2033 29.7374 25.1264 29.8588 24.9997C29.9498 24.9058 30.0256 24.7967 30.0863 24.6725C30.1708 24.4959 30.2553 24.159 30.2899 23.8784C30.3159 23.6639 30.3083 23.5469 30.3051 23.4743C30.3008 23.3584 30.2043 23.2382 30.0993 23.1872L29.4688 22.9045C29.4688 22.9045 28.5263 22.4939 27.9499 22.2317C27.8896 22.2055 27.825 22.1904 27.7593 22.1873C27.6851 22.1796 27.6102 22.1878 27.5395 22.2116C27.4689 22.2353 27.4042 22.274 27.3498 22.3249C27.3443 22.3227 27.2718 22.3845 26.4885 23.3335C26.4436 23.3939 26.3816 23.4396 26.3106 23.4646C26.2396 23.4897 26.1628 23.4931 26.0898 23.4743C26.0192 23.4555 25.9501 23.4316 25.8829 23.4028C25.7486 23.3465 25.702 23.3248 25.6099 23.2858C24.988 23.0149 24.4122 22.6483 23.9037 22.1992C23.7672 22.0801 23.6404 21.9501 23.5104 21.8244C23.0843 21.4162 22.7128 20.9545 22.4054 20.4507L22.3415 20.3478C22.2963 20.2783 22.2592 20.2038 22.231 20.1257C22.1898 19.9665 22.2971 19.8387 22.2971 19.8387C22.2971 19.8387 22.5603 19.5505 22.6828 19.3945C22.8019 19.2428 22.9027 19.0955 22.9677 18.9904C23.0955 18.7846 23.1356 18.5733 23.0684 18.4097C22.7651 17.6687 22.4516 16.9317 22.1281 16.1987C22.0642 16.0535 21.8746 15.9495 21.7023 15.9289C21.6438 15.9217 21.5853 15.9159 21.5268 15.9116C21.3814 15.9032 21.2355 15.9047 21.0903 15.9159L21.3091 15.9083Z" fill="#F1F1F1" />
              </g>
              <defs>
                <filter id="filter0_d_138_354" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.2 0 0 0 0 0.203922 0 0 0 0 0.792157 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_138_354" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_138_354" result="shape" />
                </filter>
              </defs>
            </svg>
          </Box>

          <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
            <MenuItem onClick={handleMarkComplete}>
              <Iconify icon="eva:checkmark-circle-2-fill" />
              Mark Complete
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>

            <MenuItem onClick={handleShare}>
              <Iconify icon="solar:share-bold" />
              Share
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </CustomPopover>
        </Stack>
      </Stack>
    </Stack>
  );
}
