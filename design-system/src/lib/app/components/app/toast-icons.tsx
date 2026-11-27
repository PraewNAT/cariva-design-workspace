import type { ComponentProps } from "react";

// Severity icons copied from the Figma icon components used by `toast` (24px box, 2026-11-26).
// Filled / outlined toasts use the Outline set, standard toasts use the Rounded set.
function make(offset: string, d: string) {
  return function ToastIcon(props: ComponentProps<"svg">) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path transform={`translate(${offset})`} d={d} />
      </svg>
    );
  };
}

export const ToastErrorOutlineIcon = make(
  "2 2",
  "M9 13L11 13L11 15L9 15L9 13ZM9 5L11 5L11 11L9 11L9 5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
);
export const ToastErrorRoundedIcon = make(
  "2 2",
  "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10L9 6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6L11 10C11 10.55 10.55 11 10 11ZM11 15L9 15L9 13L11 13L11 15Z"
);
export const ToastReportProblemOutlinedIcon = make(
  "1 2",
  "M11 3.99L18.53 17L3.47 17L11 3.99ZM11 0L0 19L22 19L11 0ZM12 14L10 14L10 16L12 16L12 14ZM12 8L10 8L10 12L12 12L12 8Z"
);
export const ToastWarningRoundedIcon = make(
  "2.4686 3.9925",
  "M2.0014 17.0075L17.0614 17.0075C18.6014 17.0075 19.5614 15.3375 18.7914 14.0075L11.2614 0.9975C10.4914 -0.3325 8.5714 -0.3325 7.8014 0.9975L0.2714 14.0075C-0.4986 15.3375 0.4614 17.0075 2.0014 17.0075ZM9.5314 10.0075C8.9814 10.0075 8.5314 9.5575 8.5314 9.0075L8.5314 7.0075C8.5314 6.4575 8.9814 6.0075 9.5314 6.0075C10.0814 6.0075 10.5314 6.4575 10.5314 7.0075L10.5314 9.0075C10.5314 9.5575 10.0814 10.0075 9.5314 10.0075ZM10.5314 14.0075L8.5314 14.0075L8.5314 12.0075L10.5314 12.0075L10.5314 14.0075Z"
);
export const ToastInfoOutlineIcon = make(
  "2 2",
  "M9 5L11 5L11 7L9 7L9 5ZM9 9L11 9L11 15L9 15L9 9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
);
export const ToastInfoRoundedIcon = make(
  "2 2",
  "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 15C9.45 15 9 14.55 9 14L9 10C9 9.45 9.45 9 10 9C10.55 9 11 9.45 11 10L11 14C11 14.55 10.55 15 10 15ZM11 7L9 7L9 5L11 5L11 7Z"
);
export const ToastCheckCircleOutlineIcon = make(
  "2 2",
  "M14.59 5.58L8 12.17L4.41 8.59L3 10L8 15L16 7L14.59 5.58ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
);
export const ToastCheckCircleRoundedIcon = make(
  "2 2",
  "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM7.29 14.29L3.7 10.7C3.31 10.31 3.31 9.68 3.7 9.29C4.09 8.9 4.72 8.9 5.11 9.29L8 12.17L14.88 5.29C15.27 4.9 15.9 4.9 16.29 5.29C16.68 5.68 16.68 6.31 16.29 6.7L8.7 14.29C8.32 14.68 7.68 14.68 7.29 14.29Z"
);

export function ToastCloseIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        transform="translate(5.4075 5.4077)"
        d="M12.8925 0.3025C12.5025 -0.0875 11.8725 -0.0875 11.4825 0.3025L6.5925 5.1825L1.7025 0.2925C1.3125 -0.0975 0.6825 -0.0975 0.2925 0.2925C-0.0975 0.6825 -0.0975 1.3125 0.2925 1.7025L5.1825 6.5925L0.2925 11.4825C-0.0975 11.8725 -0.0975 12.5025 0.2925 12.8925C0.6825 13.2825 1.3125 13.2825 1.7025 12.8925L6.5925 8.0025L11.4825 12.8925C11.8725 13.2825 12.5025 13.2825 12.8925 12.8925C13.2825 12.5025 13.2825 11.8725 12.8925 11.4825L8.0025 6.5925L12.8925 1.7025C13.2725 1.3225 13.2725 0.6825 12.8925 0.3025Z"
      />
    </svg>
  );
}
