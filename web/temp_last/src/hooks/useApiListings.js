import PropTypes from "prop-types"
import {useMemo} from "react"
import {paths} from "src/global/constants"
import fetcher from "src/util/fetcher"
import laggy from "src/util/laggy"
import normalizeItem from "src/util/normalize-item"
import useSWR from "swr"

export default function useApiListings(params) {
  console.log('params',paths.apiMarketItemsList(params));
  const {data, error} = useSWR(paths.apiMarketItemsList(params), fetcher, {
    use: [laggy],}
  
  )
  console.log('data',data)
  const listings = useMemo(() => {
    // Paginated queries return an object
    console.log(data)
    const listingsArray = Array.isArray(data) ? data : data?.results
    return listingsArray?.map(item => normalizeItem(item))
  }, [data])

  return {listings, data, error, isLoading: !data && !error}
}

useApiListings.propTypes = {
  params: PropTypes.object,
}