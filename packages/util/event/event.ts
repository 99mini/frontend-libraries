export const isMouseEvent = (event: TouchEvent | MouseEvent): event is MouseEvent => event && "screenX" in event;
export const isTouchEvent = (event: TouchEvent | MouseEvent): event is TouchEvent => event && "touches" in event;
