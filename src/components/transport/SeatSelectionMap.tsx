
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserCheck, Users } from 'lucide-react';

interface SeatSelectionMapProps {
  serviceType: 'bus' | 'train' | 'flight' | 'shuttle';
  totalSeats: number;
  occupiedSeats: number[];
  onSeatSelect: (seatNumbers: number[]) => void;
  passengerCount: number;
  selectedSeats?: number[];
}

const SEAT_LAYOUTS = {
  bus: {
    standard: { rows: 13, seatsPerRow: 4, aisleAfter: [2], name: 'Standard Bus (2+2)' },
    luxury: { rows: 10, seatsPerRow: 3, aisleAfter: [1], name: 'Luxury Bus (1+2)' },
    doubledecker: { rows: 20, seatsPerRow: 4, aisleAfter: [2], name: 'Double Decker (2+2)' }
  },
  shuttle: {
    minibus: { rows: 4, seatsPerRow: 4, aisleAfter: [2], name: '14-Seater Minibus' }
  },
  train: {
    economy: { rows: 15, seatsPerRow: 6, aisleAfter: [2, 4], name: 'Economy Class (3+3)' },
    business: { rows: 10, seatsPerRow: 4, aisleAfter: [2], name: 'Business Class (2+2)' },
    first: { rows: 8, seatsPerRow: 2, aisleAfter: [1], name: 'First Class (1+1)' }
  },
  flight: {
    economy: { rows: 30, seatsPerRow: 6, aisleAfter: [3], name: 'Economy Class (3+3)' },
    business: { rows: 8, seatsPerRow: 4, aisleAfter: [2], name: 'Business Class (2+2)' },
    first: { rows: 4, seatsPerRow: 2, aisleAfter: [1], name: 'First Class (1+1)' }
  }
};

export const SeatSelectionMap = ({ 
  serviceType, 
  totalSeats, 
  occupiedSeats, 
  onSeatSelect, 
  passengerCount,
  selectedSeats = []
}: SeatSelectionMapProps) => {
  const [currentSelection, setCurrentSelection] = useState<number[]>(selectedSeats);
  const [selectedLayout, setSelectedLayout] = useState<string>('');
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);

  useEffect(() => {
    // Set default layout based on service type
    const layouts = SEAT_LAYOUTS[serviceType];
    const defaultKey = Object.keys(layouts)[0];
    setSelectedLayout(defaultKey);
  }, [serviceType]);

  useEffect(() => {
    onSeatSelect(currentSelection);
  }, [currentSelection, onSeatSelect]);

  const getCurrentLayout = () => {
    if (!selectedLayout) return null;
    return SEAT_LAYOUTS[serviceType][selectedLayout as keyof typeof SEAT_LAYOUTS[typeof serviceType]];
  };

  const layout = getCurrentLayout();
  if (!layout) return null;

  const maxSeats = serviceType === 'shuttle' ? 14 : Math.min(totalSeats, layout.rows * layout.seatsPerRow);

  const handleSeatClick = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber) || reservedSeats.includes(seatNumber)) return;

    let newSelection = [...currentSelection];
    
    if (currentSelection.includes(seatNumber)) {
      // Remove seat from selection
      newSelection = currentSelection.filter(seat => seat !== seatNumber);
    } else if (currentSelection.length < passengerCount) {
      // Add seat to selection
      newSelection.push(seatNumber);
      
      // If this completes the selection, mark these seats as reserved
      if (newSelection.length === passengerCount) {
        setReservedSeats([...reservedSeats, ...newSelection]);
      }
    }

    setCurrentSelection(newSelection);
  };

  const getSeatStatus = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return 'occupied';
    if (reservedSeats.includes(seatNumber) && !currentSelection.includes(seatNumber)) return 'reserved';
    if (currentSelection.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-red-500 text-white cursor-not-allowed';
      case 'reserved': return 'bg-orange-400 text-white cursor-not-allowed';
      case 'selected': return 'bg-blue-500 text-white';
      case 'available': return 'bg-gray-200 hover:bg-gray-300 cursor-pointer';
      default: return 'bg-gray-200';
    }
  };

  const renderSeatMap = () => {
    const seats = [];
    let seatNumber = 1;

    for (let row = 0; row < layout.rows && seatNumber <= maxSeats; row++) {
      const rowSeats = [];
      
      for (let col = 0; col < layout.seatsPerRow && seatNumber <= maxSeats; col++) {
        const status = getSeatStatus(seatNumber);
        
        rowSeats.push(
          <Button
            key={seatNumber}
            variant="outline"
            size="sm"
            className={`w-10 h-10 text-xs ${getSeatColor(status)}`}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={status === 'occupied' || status === 'reserved'}
          >
            {status === 'occupied' ? <UserCheck className="h-4 w-4" /> : 
             status === 'reserved' ? <Users className="h-4 w-4" /> : seatNumber}
          </Button>
        );

        // Add aisle space
        if (layout.aisleAfter.includes(col + 1) && col < layout.seatsPerRow - 1) {
          rowSeats.push(<div key={`aisle-${row}-${col}`} className="w-4" />);
        }

        seatNumber++;
      }

      seats.push(
        <div key={row} className="flex justify-center gap-1 mb-2">
          <span className="w-6 text-xs text-gray-500 flex items-center justify-center">
            {row + 1}
          </span>
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  const layouts = SEAT_LAYOUTS[serviceType];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Select Your Seats ({currentSelection.length}/{passengerCount})
        </CardTitle>
        
        {Object.keys(layouts).length > 1 && (
          <div className="mt-4">
            <Select value={selectedLayout} onValueChange={setSelectedLayout}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose seat layout" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(layouts).map(([key, layout]) => (
                  <SelectItem key={key} value={key}>
                    {layout.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-center mb-4 text-sm font-medium text-gray-600">
              {serviceType === 'flight' ? 'Front (Cockpit)' : 
               serviceType === 'train' ? 'Front (Engine)' : 'Front (Driver)'}
            </div>
            <div className="overflow-x-auto">
              {renderSeatMap()}
            </div>
          </div>

          {currentSelection.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Selected Seats:</h4>
              <div className="flex flex-wrap gap-2">
                {currentSelection.map(seat => (
                  <Badge key={seat} variant="secondary">
                    Seat {seat}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {currentSelection.length < passengerCount && (
            <p className="text-sm text-amber-600">
              Please select {passengerCount - currentSelection.length} more seat(s)
            </p>
          )}

          {currentSelection.length === passengerCount && (
            <p className="text-sm text-green-600 font-medium">
              ✓ All seats selected! These seats are now reserved for you.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
