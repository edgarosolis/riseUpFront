import { styled } from "@mui/material";

export const WaveOverlay = styled('div')({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    lineHeight: 0,
    '& svg': {
      display: 'block',
      width: '100%',
      height: '250px',
      // Invertimos o ajustamos el aspect ratio para que cubra todo el ancho
    },
});