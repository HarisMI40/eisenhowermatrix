'use client'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import Matrix from '@/app/components/matrix'

export default function Home() {
  return (
    <Provider store={store}>
      <Matrix />
    </Provider>
  );
}
