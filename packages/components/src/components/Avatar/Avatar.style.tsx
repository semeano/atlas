import { css } from "@emotion/core";
import { spacing, typography, colors } from "../../theme";

export type AvatarStyleProps = {
  img?: string;
  size?: "small" | "default" | "large";
};

export let makeStyles = ({ img, size = "default" }: AvatarStyleProps) => {
  let width =
    size === "small"
      ? spacing.s9
      : size === "default"
      ? spacing.s19
      : spacing.s25;

  let margin =
    size === "small"
      ? spacing.s2
      : size === "default"
      ? spacing.s4
      : spacing.s6;
  return css`
    background-image: ${img
      ? `url(${img})`
      : `radial-gradient(${colors.bg.primary}, ${colors.bg.primary})`};
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    min-width: ${width};
    min-height: ${width};
    max-width: ${width};
    max-height: ${width};
    margin: auto ${margin} auto;
  `;
};
