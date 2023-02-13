import { HoloSettings } from "../models/HoloSettings";

const sizes: { height: number; width: number; x: number; y: number } = {
  height: 1000,
  width: 1000,
  x: 0,
  y: 0,
};

const hologramSettings: HoloSettings = {
  ...sizes,
  faces: [
    {
      size: {
        width: sizes.width / 3,
        height: sizes.height / 3,
        rotation: -180,
      },
      positions: {
        left: sizes.width / 3,
        top: 0,
      },
    },
    {
      size: {
        width: sizes.width / 3,
        height: sizes.height / 3,
        rotation: 90,
      },
      positions: {
        left: 0,
        top: sizes.height / 3,
      },
    },
    {
      size: {
        width: sizes.width / 3,
        height: sizes.height / 3,
        rotation: -90,
      },
      positions: {
        left: (sizes.width / 3) * 2,
        top: sizes.height / 3,
      },
    },
    {
      size: {
        width: sizes.width / 3,
        height: sizes.height / 3,
        rotation: 0,
      },
      positions: {
        left: sizes.width / 3,
        top: (sizes.height / 3) * 2,
      },
    },
  ],
};

export default {
  ...sizes,
  ...hologramSettings,
  gameEndpoint: "http://localhost:8005",
  recordEndpoint: "http://localhost:8007",
  pullupDelay: 10 * 1000, //10 sec
};
