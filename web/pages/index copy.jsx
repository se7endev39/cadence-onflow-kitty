import LatestMarketplaceItems from "src/components/LatestMarketplaceItems"
import LatestStoreItems from "src/components/LatestStoreItems"
import PageTitle from "src/components/PageTitle"
import useApiListings from "src/hooks/useApiListings"

export default function Home() {
  const {listings} = useApiListings()
  return (
    <div>
      <PageTitle>Store</PageTitle>
      <main>
        {listings?.length > 0 && (
          <>
            <LatestStoreItems items={listings} />
            <LatestMarketplaceItems items={listings} />
          </>
        )}
      </main>
    </div>
  )
}
