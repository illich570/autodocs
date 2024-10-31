import { useEffect, useState, useMemo } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const mobileKeywords = useMemo(
    () => ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'],
    [],
  )

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    const checkIsMobile = () => {
      const isMobileDevice = mobileKeywords.some((keyword) => userAgent.includes(keyword))
      setIsMobile(isMobileDevice)
    }
    checkIsMobile()
  }, [mobileKeywords])

  return isMobile
}

export default useIsMobile
