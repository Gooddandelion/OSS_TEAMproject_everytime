import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './EditPage.css';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from '@mui/material';

function EditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedLecture, fetchLectureById, updateLecture } = useLectureStore();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            강의명: '',
            교수님: '',
            과제량: '모름',
            평점: '',
            조별과제횟수: '모름',
            성적평가: '모름',
            출석관리: '모름',
            시험횟수: '',
            강의시간: '',
            이수구분: '',
            학점: '',
            BSM여부: '0',
            설계학점: '',
            영어비율: ''
        }
    });

    useEffect(() => {
        if (id) fetchLectureById(id);
    }, [id, fetchLectureById]);

    useEffect(() => {
        if (selectedLecture) {
            // 강의시간이 배열이면 문자열로 변환
            const timeValue = Array.isArray(selectedLecture.강의시간) ? selectedLecture.강의시간.join(',') : selectedLecture.강의시간 || '';
            reset({
                강의명: selectedLecture.강의명 || '',
                교수님: selectedLecture.교수님 || '',
                과제량: selectedLecture.과제량 || '모름',
                평점: selectedLecture.평점 || '',
                조별과제횟수: selectedLecture.조별과제횟수 || '모름',
                성적평가: selectedLecture.성적평가 || '모름',
                출석관리: selectedLecture.출석관리 || '모름',
                시험횟수: selectedLecture.시험횟수 || '',
                강의시간: timeValue,
                이수구분: selectedLecture.이수구분 || '',
                학점: selectedLecture.학점 || '',
                BSM여부: selectedLecture.BSM여부 ? String(selectedLecture.BSM여부) : '0',
                설계학점: selectedLecture.설계학점 || '',
                영어비율: selectedLecture.영어비율 || ''
            });
        }
    }, [selectedLecture, reset]);

    const onSubmit = async (data) => {
        const lectureTimeArray = data.강의시간 ? data.강의시간.split(',').map(item => item.trim()) : [];
        const submissionData = { ...data, 강의시간: lectureTimeArray, BSM여부: Number(data.BSM여부) };
        await updateLecture(id, submissionData);
        alert('수정되었습니다.');
        navigate(`/detail/${id}`);
    };

    return (
        <Box className="edit-page" sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>강의 정보 수정</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="강의명"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="과목명" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="교수님"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="교수님" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="과제량"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>과제량</InputLabel>
                            <Select {...field} label="과제량">
                                <MenuItem value="많음">많음</MenuItem>
                                <MenuItem value="보통">보통</MenuItem>
                                <MenuItem value="없음">없음</MenuItem>
                                <MenuItem value="모름">모름</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="평점"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="평점" type="number" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="조별과제횟수"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>조별과제횟수</InputLabel>
                            <Select {...field} label="조별과제횟수">
                                <MenuItem value="많음">많음</MenuItem>
                                <MenuItem value="보통">보통</MenuItem>
                                <MenuItem value="없음">없음</MenuItem>
                                <MenuItem value="모름">모름</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="성적평가"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>성적평가</InputLabel>
                            <Select {...field} label="성적평가">
                                <MenuItem value="너그러움">너그러움</MenuItem>
                                <MenuItem value="보통">보통</MenuItem>
                                <MenuItem value="깐깐함">깐깐함</MenuItem>
                                <MenuItem value="모름">모름</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="출석관리"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>출석관리</InputLabel>
                            <Select {...field} label="출석관리">
                                <MenuItem value="전자출결">전자출결</MenuItem>
                                <MenuItem value="직접호명">직접호명</MenuItem>
                                <MenuItem value="없음">없음</MenuItem>
                                <MenuItem value="모름">모름</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="시험횟수"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="시험횟수" type="number" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="강의시간"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="강의시간 (예: 월요일,목요일,1교시)" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="이수구분"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="이수구분" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="학점"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="학점" type="number" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="BSM여부"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>BSM여부</InputLabel>
                            <Select {...field} label="BSM여부">
                                <MenuItem value={'1'}>O</MenuItem>
                                <MenuItem value={'0'}>X</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="설계학점"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="설계학점" type="number" fullWidth margin="normal" />
                    )}
                />

                <Controller
                    name="영어비율"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="영어비율(%)" type="number" fullWidth margin="normal" />
                    )}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit">수정 완료</Button>
                </Box>
            </form>
        </Box>
    );
}

export default EditPage;