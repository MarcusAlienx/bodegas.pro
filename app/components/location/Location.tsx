import { useAuth } from "../../hooks/useAuth";
import { Property } from "../../models/property";

interface LocationProps {
  property: Property;
}

export const Location = ({ property }: LocationProps) => {
  const { user } = useAuth();

  if (user) {
    return (
      <div>
        <p><strong>Address:</strong> {property.location.address}</p>
        <p><strong>Coordinates:</strong> {property.location.coordinates.lat}, {property.location.coordinates.lng}</p>
      </div>
    );
  }

  return (
    <div>
      <p><strong>City:</strong> {property.location.approximateLocation.city}</p>
      <p><strong>State:</strong> {property.location.approximateLocation.state}</p>
      <p><strong>Zone:</strong> {property.location.approximateLocation.zone}</p>
    </div>
  );
};
