import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../store/features/modal/modalSlice';

export const useModal = () => {
    const modalState = useSelector((store) => store.modal);

    const dispatch = useDispatch();

    /**
     *
     * @param {string} name
     * @param {boolean} value
     */
    function toggleModalState(name, value) {
        dispatch(toggleModal({ name, value }));
    }

    return { ...modalState, toggleModalState };
};
