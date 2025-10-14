import { create } from 'zustand';
import * as lectureApi from '../api/lectureApi';

const useLectureStore = create((set, get) => ({
    // --- 상태 (State) ---
    lectures: [], // 강의 목록 데이터 
    myLectures: [], // 나의 강의 목록 데이터
    selectedLecture: null,
    isLoading: false,  // 로딩 중 여부 
    error: null,  // 에러 메시지 

    // --- lectures ---
    // 1. list
    fetchLectures: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await lectureApi.getLectures();
            set({ lectures: response.data, isLoading: false });
        } catch (error) {
            set({ error: '데이터를 불러오는 데 실패했습니다.', isLoading: false });
        }
    },

    // 2. add 
    addLecture: async (lectureData) => {
        set({ isLoading: true, error: null });
        try {
            await lectureApi.addLecture(lectureData);
            await get().fetchLectures();
        } catch (error) {
            set({ error: '강의 추가에 실패했습니다.', isLoading: false });
        }
    },

    // 3. detail
    fetchLectureById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await lectureApi.getLectureById(id);
            set({ selectedLecture: response.data, isLoading: false });
        } catch (error) {
            set({ error: '데이터를 불러오는 데 실패했습니다.', isLoading: false });
        }
    },

    // 4. delete
    deleteLecture: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await lectureApi.deleteLecture(id);
            set({ isLoading: false });
        } catch (error) {
            set({ error: '강의 삭제에 실패했습니다.', isLoading: false });
        }
    },

    // 5. update
    updateLecture: async (id, lectureData) => {
        set({ isLoading: true, error: null });
        try {
            await lectureApi.updateLecture(id, lectureData);
            set({ isLoading: false });
        } catch (error) {
            set({ error: '강의 수정에 실패했습니다.', isLoading: false });
        }
    },

    // --- myLectures ---
    // 1. list
    fetchMyLectures: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await lectureApi.getMyLectures();
            set({ myLectures: response.data, isLoading: false });
        } catch (error) {
            set({ error: "나의 강의 목록을 불러오지 못했습니다.", isLoading: false });
        }
    },

    // 2. add
    addLectureToMyList: async (lectureToAdd) => {
        if (get().myLectures.some(lecture => lecture.id === lectureToAdd.id)) {
            alert('이미 추가된 강의입니다.');
            return;
        }
        set({ isLoading: true });
        try {
            await lectureApi.addMyLecture(lectureToAdd);
            await get().fetchMyLectures();
        } catch (error) {
            set({ error: "강의 추가에 실패했습니다.", isLoading: false });
        }
    },

    // 3. delete
    removeLectureFromMyList: async (lectureId) => {
        set({ isLoading: true });
        try {
            await lectureApi.deleteMyLecture(lectureId);
            await get().fetchMyLectures();
        } catch (error) {
            set({ error: "강의 삭제에 실패했습니다.", isLoading: false });
        }
    },
}));

export default useLectureStore;