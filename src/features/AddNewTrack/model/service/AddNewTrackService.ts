export const createTrack = async (form:FormData) => {
  const res = await fetch('http://localhost:3000/tracks', {
    method: 'post',
    body: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(res);
};
