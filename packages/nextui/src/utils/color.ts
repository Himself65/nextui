import { NormalColors, normalColors } from './prop-types';
import { NextUIThemesPalette } from '@theme/index';
/**
 * This function allows validate if a string is a hexadecimal
 * value
 * @param str [string] hexadecimal value
 * @returns result [boolean]
 */
export const isHex = (str: string): boolean => {
  const exp = /#[a-fA-F0-9]{3,6}/g;
  return exp.test(str);
};

/**
 *
 * @param hex [string]
 * @param alpha [number]
 * @returns [string]
 */
export const hexToRGBA = (hex: string, alpha: number = 1): string => {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;
  // 3 digits
  if (hex.length == 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
    // 6 digits
  } else if (hex.length == 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }
  return `rgba(${+r}, ${+g},${+b},${alpha})`;
};

export const getNormalColor = (
  color: NormalColors | string | undefined,
  palette: NextUIThemesPalette,
  defaultColor: string = 'inherit'
) => {
  const colors: { [key in NormalColors | string]: string } = {
    default: defaultColor,
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    gradient: palette.gradient,
  };
  return color && colors[color] ? colors[color] : color || defaultColor;
};

export const isNormalColor = (color: string): boolean => {
  let found = normalColors.find((el) => el === color);
  return found !== undefined && found !== null;
};

/**
 * Function that checks color name support in the current browser
 * @param strColor
 * @returns boolean
 */
export const isColor = (strColor: string) => {
  let s = new Option().style;
  s.color = strColor;
  return s.color == strColor;
};

const hexToRgb = (color: string): [number, number, number] => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(
    fullReg,
    (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`
  );
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  if (!values) {
    throw new Error(`Next UI: Unsupported ${color} color.`);
  }
  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ];
};

export const colorToRgbValues = (color: string) => {
  if (color.charAt(0) === '#') return hexToRgb(color);

  const safeColor = color.replace(/ /g, '');
  const colorType = color.substr(0, 4);

  const regArray = safeColor.match(/\((.+)\)/);
  if (!colorType.startsWith('rgb') || !regArray) {
    console.log(color);
    throw new Error(`Next UI: Only support ["RGB", "RGBA", "HEX"] color.`);
  }

  return regArray[1].split(',').map((str) => Number.parseFloat(str));
};

export const addColorAlpha = (color: string, alpha: number) => {
  if (!/^#|rgb|RGB/.test(color)) return color;
  const [r, g, b] = colorToRgbValues(color);
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
};