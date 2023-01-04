import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/types';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
