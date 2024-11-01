'use client'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import Matrix from '@/app/components/matrix'
import Modal from './components/modal'

export default function Home() {
  return (
    <Provider store={store}>
      <Matrix />
      <Modal />
    </Provider>
  );
}
