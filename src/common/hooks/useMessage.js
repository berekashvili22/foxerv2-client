import React from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/features/message/messageSlice';

export const useMessage = () => {
    const dispatch = useDispatch();

    /**
     *  Sets modal message
     * @param {string} msg - modal text
     * @param {number} time - modal appearance duration in ms
     * @param {boolean} success - determines color of modal
     */
    const setModalMessage = (msg, time, success = false) => {
        try {
            const modalAppearanceTime = typeof time === 'number' ? time : 3000; // Double check/validate time value
            // Show modal message
            dispatch(setMessage({ message: msg, type: success }));
            // Hide modal message after modalAppearanceTime
            setTimeout(() => {
                dispatch(setMessage({ message: '', type: '' }));
            }, modalAppearanceTime);
        } catch (e) {
            console.log('🚀 ~ file: useMessage.js ~ line 23 ~ setModalMessage ~ e', e);
        }
    };

    return { setModalMessage };
};
