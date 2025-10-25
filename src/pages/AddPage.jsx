import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './AddPage.css';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from '@mui/material';


function AddPage() {
    const navigate = useNavigate();
    const { addLecture } = useLectureStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
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

    const onSubmit = async (data) => {
        const lectureTimeArray = data.강의시간 ? data.강의시간.split(',').map(item => item.trim()) : [];
        const submissionData = {
            ...data,
            강의시간: lectureTimeArray,
            BSM여부: Number(data.BSM여부)
        };
        await addLecture(submissionData);
        alert('강의가 성공적으로 추가되었습니다!');
        navigate('/list');
    };

    return (
        <Box className="add-page" sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>새로운 강의 추가</Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="강의명"
                    control={control}
                    rules={{ required: '과목명은 필수입니다.' }}
                    render={({ field }) => (
                        <TextField {...field} label="과목명" fullWidth margin="normal" error={!!errors.강의명} helperText={errors.강의명?.message} />
                    )}
                />

                <Controller
                    name="교수님"
                    control={control}
                    rules={{ required: '교수님은 필수입니다.' }}
                    render={({ field }) => (
                        <TextField {...field} label="교수님" fullWidth margin="normal" error={!!errors.교수님} helperText={errors.교수님?.message} />
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
                    rules={{
                        required: '평점은 필수입니다.',
                        min: { value: 0, message: '0 이상 입력' },
                        max: { value: 5, message: '5 이하 입력' },
                    }}
                    render={({ field }) => (
                        <TextField {...field} label="평점" type="number" fullWidth margin="normal" error={!!errors.평점} helperText={errors.평점?.message} />
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
                    rules={{
                        min: { value: 0, message: '0 이상 입력' },
                        max: { value: 10, message: '10 이하 입력' },
                    }}
                    render={({ field }) => (
                        <TextField {...field} label="시험횟수" type="number" fullWidth margin="normal" error={!!errors.시험횟수} helperText={errors.시험횟수?.message} />
                    )}
                />

                <Controller
                    name="강의시간"
                    control={control}
                    rules={{ required: '강의시간은 필수입니다.' }}
                    render={({ field }) => (
                        <TextField {...field} label="강의시간 (예: 월요일,목요일,1교시)" fullWidth margin="normal" error={!!errors.강의시간} helperText={errors.강의시간?.message} />
                    )}
                />

                <Controller
                    name="이수구분"
                    control={control}
                    rules={{ required: '이수구분은 필수입니다.' }}
                    render={({ field }) => (
                        <TextField {...field} label="이수구분" fullWidth margin="normal" error={!!errors.이수구분} helperText={errors.이수구분?.message} />
                    )}
                />

                <Controller
                    name="학점"
                    control={control}
                    rules={{
                        required: '학점은 필수입니다.',
                        min: { value: 1, message: '1 이상 입력' },
                        max: { value: 5, message: '5 이하 입력' },
                    }}
                    render={({ field }) => (
                        <TextField {...field} label="학점" type="number" fullWidth margin="normal" error={!!errors.학점} helperText={errors.학점?.message} />
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
                    rules={{
                        min: { value: 0, message: '0 이상 입력' },
                        max: { value: 10, message: '10 이하 입력' },
                    }}
                    render={({ field }) => (
                        <TextField {...field} label="설계학점" type="number" fullWidth margin="normal" error={!!errors.설계학점} helperText={errors.설계학점?.message} />
                    )}
                />

                <Controller
                    name="영어비율"
                    control={control}
                    rules={{
                        min: { value: 0, message: '0 이상 입력' },
                        max: { value: 100, message: '100 이하 입력' },
                    }}
                    render={({ field }) => (
                        <TextField {...field} label="영어비율(%)" type="number" fullWidth margin="normal" error={!!errors.영어비율} helperText={errors.영어비율?.message} />
                    )}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit">새 강의 추가하기</Button>
                </Box>
            </form>
        </Box>
    );
}

export default AddPage;