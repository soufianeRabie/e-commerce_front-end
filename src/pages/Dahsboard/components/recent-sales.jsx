import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button.jsx'
import { Link } from 'react-router-dom'

export function RecentSales() {
  const [LatestSalles, setLatestSalles] = useState([])
  const [completedDeliveries, setCompletedDeliveries] = useState([])
  const { deliveries } = useAuth()

  useEffect(() => {
    setCompletedDeliveries(
      deliveries.filter((del) => del.status === 'completed'),
    )
  }, [deliveries])

  console.log(completedDeliveries)

  console.log(deliveries)
  console.log(LatestSalles)

  return (
    <div className="space-y-8">
      {completedDeliveries.map((salle, key) => {
        return (
          <div key={key} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {salle?.first_name}
              </p>
              <p className="text-sm text-muted-foreground">{salle?.email}</p>
            </div>
            <div className="ml-auto font-medium">+${salle?.amount}</div>
            <div className={'ml-auto'}>
              <Link to={`deliveries/${salle?.id}`}>
                <Button >more details</Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
