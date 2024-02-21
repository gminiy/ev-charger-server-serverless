function generateMockData(numRecords) {
  const mockData = [];
  for (let i = 1; i <= numRecords; i++) {
    const addressId = Math.floor(Math.random() * 10) + 1;
    const chargerType = Math.floor(Math.random() * 7); // 0 to 6
    const status = Math.floor(Math.random() * 6); // 0 to 5
    const location = `B 구역 ${Math.floor(Math.random() * 100)}`;
    const output = [3, 7, 50, 100, 200, 350][Math.floor(Math.random() * 6)];
    const lastStatusUpdatedAt = Math.floor(Date.now() / 1000);

    // Assuming lastStartChargingTimestamp is within the last 30 days
    const lastStartChargingTimestamp =
      Math.floor(Date.now() / 1000) -
      Math.floor(Math.random() * 30) * 24 * 60 * 60;
    let lastEndChargingTimestamp;

    // If status is 2, lastEndChargingTimestamp is before lastStartChargingTimestamp
    if (status === 2) {
      lastEndChargingTimestamp =
        lastStartChargingTimestamp - (Math.floor(Math.random() * 9000) + 1000);
    } else {
      lastEndChargingTimestamp =
        lastStartChargingTimestamp + (Math.floor(Math.random() * 9000) + 1000);
    }

    const createdAt = lastStatusUpdatedAt;
    const updatedAt = lastStatusUpdatedAt;

    const insertStatement = `INSERT INTO chargers (id, address_id, charger_type, location, status, last_status_updated_at, output, last_start_charging_timestamp, last_end_charging_timestamp, created_at, updated_at) VALUES ('${i}', '${addressId}', ${chargerType}, '${location}', ${status}, ${lastStatusUpdatedAt}, ${output}, ${lastStartChargingTimestamp}, ${lastEndChargingTimestamp}, ${createdAt}, ${updatedAt});`;
    mockData.push(insertStatement);
  }

  return mockData;
}

// Generate 10 mock data records
const mockData = generateMockData(100);
console.log(mockData);
