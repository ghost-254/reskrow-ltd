"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PriceCalculator() {
  const [housePrice, setHousePrice] = useState<number>(0)
  const [commission, setCommission] = useState<number>(0)
  const [ownerReceives, setOwnerReceives] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('KES')
  const [currencyFormatter, setCurrencyFormatter] = useState<Intl.NumberFormat>(() => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }))
  const [maxCommission, setMaxCommission] = useState<number>(100000)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const countryCode = data.country;
        let currencyCode = 'KES'; // default currency
        let currencySymbol = 'en-KE';
        let maxCommission = 100000; // default max commission in KES

        switch (countryCode) {
          case 'US':
            currencyCode = 'USD';
            currencySymbol = 'en-US';
            maxCommission = 1000;
            break;
          case 'GB':
            currencyCode = 'GBP';
            currencySymbol = 'en-GB';
            maxCommission = 1000; // equivalent in GBP
            break;
          case 'EU':
            currencyCode = 'EUR';
            currencySymbol = 'en-EU';
            maxCommission = 1000; // equivalent in EUR
            break;
          default:
            currencyCode = 'KES';
            currencySymbol = 'en-KE';
            maxCommission = 100000; // equivalent in KES
        }
        setCurrency(currencyCode);
        setCurrencyFormatter(new Intl.NumberFormat(currencySymbol, { style: 'currency', currency: currencyCode }));
        setMaxCommission(maxCommission);
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  }, []);

  useEffect(() => {
    const calcCommission = housePrice * 0.015
    const cappedCommission = Math.min(calcCommission, maxCommission)
    setCommission(cappedCommission)
    setOwnerReceives(housePrice - cappedCommission)
  }, [housePrice, maxCommission])

  const handleHousePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHousePrice(value === "" ? 0 : Number(value))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="housePrice">Enter Property Price</Label>
        <Input
          id="housePrice"
          type="number"
          value={housePrice === 0 ? "" : housePrice}
          onChange={handleHousePriceChange}
          placeholder={`Enter property price in ${currency}`}
        />
        <p className="text-sm text-muted-foreground mt-1">Selling price of the property.</p>
      </div>

      <div>
        <Label htmlFor="commission">Escrow Service Charge</Label>
        <Input
          id="commission"
          type="text"
          value={currencyFormatter.format(commission)}
          readOnly
        />
        <p className="text-sm text-muted-foreground mt-1">Commission charged (1.5% of the property price, max {currencyFormatter.format(maxCommission)}).</p>
      </div>

      <div>
        <Label htmlFor="ownerReceives">Owner Receives</Label>
        <Input
          id="ownerReceives"
          type="text"
          value={currencyFormatter.format(ownerReceives)}
          readOnly
        />
        <p className="text-sm text-muted-foreground mt-1">Amount the owner receives after commission deduction.</p>
      </div>

      <Button className="w-full">Get Started Now</Button>
    </div>
  )
}

