import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useLoadImage(limit, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: 'https://picsum.photos/v2/list',
      params: { limit: limit, page: pageNumber },
    }).then(res => {
        setImages(prevImages => {
        return [...new Set([...prevImages, ...res.data])]
      })
    //   setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      setError(true)
    })
    
  }, [limit, pageNumber])

  return { loading, error, images }
}