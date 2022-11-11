import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
