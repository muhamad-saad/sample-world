export const stopEventPropagation = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
}