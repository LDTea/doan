import axios from "axios";

export const getAll = async () => {
  const {data} = await axios.get('/api/stuffs');
  return data;
};

export const search = async searchTerm => {
  const {data} = await axios.get('/api/stuffs/search/' + searchTerm);
  return data;
}


export const getAllTags = async () => {
  const {data} = await axios.get('/api/stuffs/tags');
  return data;
}

export const getAllByTag = async tag => {
  if (tag === 'All') return getAll();
  const {data} = await axios.get('/api/stuffs/tag/'+ tag);
  return data;
};

export const getById = async stuffId => {
  const {data} = await axios.get('/api/stuffs/' + stuffId);
  return data;
}

export async function deleteById(stuffId) {
  await axios.delete('/api/stuffs/' + stuffId);
}

export async function update(stuff) {
  await axios.put('/api/stuffs', stuff);
}

export async function add(stuff) {
  const { data } = await axios.post('/api/stuffs', stuff);
  return data;
}