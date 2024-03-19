import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
export interface ModalRef {
  open(): void;
  close(): void;
}
export type ModalProps = PropsWithChildren<{
  duration?: number;
  backdrop?: string;
  bg?: string;
  borderRadius?: number;
  dismisable?: boolean;
  isBackdropLight?: boolean;
  isLightMode?: boolean;
  innerPadding?: number;
  outerPadding?: number;
  topOffset?: number;
  topInset?: number;
  bottomInset?: number;
}>;
let tr = "transparent";
function dol(isDark = false): "dark" | "light" {
  return isDark ? "dark" : "light";
}

const Modal = memo(
  forwardRef<ModalRef, ModalProps>(
    (
      {
        duration = 300,
        backdrop = tr,
        bg = "white",
        borderRadius = 24,
        dismisable = true,
        isBackdropLight = false,
        isLightMode = false,
        innerPadding = borderRadius / 2,
        outerPadding = 12,
        topOffset = 6,
        topInset = 44,
        bottomInset = 24,
        children,
      },
      ref
    ) => {
      let hd = useMemo(() => duration / 2, [duration]);
      let ht = useMemo(() => ({ duration: hd }), [hd]);
      let t = useMemo(() => ({ duration }), [duration]);
      let { width, height } = useWindowDimensions();
      let [show, setShow] = useState(false);
      let maxHeight = useMemo(
        () => height - topInset - topOffset - bottomInset,
        [height, topInset, topOffset, bottomInset]
      );
      let min = useMemo(() => 0, []);
      let max = useMemo(() => height, [height]);
      let ty = useSharedValue(max);
      let bdo = useSharedValue(tr);
      let open = useCallback(() => {
        setShow(true);
        let usc = () => {
          StatusBar.setBarStyle(`${dol(isBackdropLight)}-content`);
        };
        bdo.value = withTiming(backdrop, ht, (f) => {
          if (f) runOnJS(usc)();
        });
        ty.value = withTiming(min, t);
      }, [t, min, backdrop, hd, ht, isBackdropLight]);
      let close = useCallback(() => {
        let usc = () => {
          StatusBar.setBarStyle(`${dol(isLightMode)}-content`);
          setShow(false);
        };
        ty.value = withTiming(max, t, (f) => {
          if (f) runOnJS(usc)();
        });
        bdo.value = withTiming(tr, { duration: 3 * hd });
      }, [t, max, hd, isLightMode]);
      useImperativeHandle(ref, () => ({
        open,
        close,
      }));
      let bds = useAnimatedStyle(() => ({
        backgroundColor: bdo.value,
      }));
      let tys = useAnimatedStyle(() => ({
        transform: [
          {
            translateY: ty.value,
          },
        ],
      }));
      let ot = useMemo(
        () => Gesture.Tap().onStart(runOnJS(close)).enabled(dismisable),
        [dismisable, close]
      );
      let it = useMemo(() => Gesture.Tap().onStart(() => {}), []);
      return (
        <>
          {show && (
            <GestureDetector {...{ gesture: ot }}>
              <Animated.View
                {...{
                  style: [
                    {
                      width,
                      height,
                      justifyContent: "flex-end",
                      position: "absolute",
                      zIndex: 1,
                      paddingBottom: bottomInset,
                      paddingHorizontal: outerPadding,
                    },
                    bds,
                  ],
                }}
              >
                <GestureDetector {...{ gesture: it }}>
                  <Animated.View
                    {...{
                      style: [
                        {
                          width: "100%",
                          maxHeight,
                          backgroundColor: bg,
                          borderRadius,
                          padding: innerPadding,
                        },
                        tys,
                      ],
                      children,
                    }}
                  />
                </GestureDetector>
              </Animated.View>
            </GestureDetector>
          )}
        </>
      );
    }
  )
);
export default Modal;
