export class Statistics {
  private addVectors(a: number[], b: number[]) {
    return a.map((e, i) => e + b[i]);
  }

  private roundTimeSeries(ts: number[], decimalDigits: number) {
    const factor = 10 ** decimalDigits;
    return ts.map((p) => Math.floor(factor * p) / factor);
  }

  // public getAggregateIncomeTimeSeries(
  //   numberOfPeriods: number,
  //   consumerHistories: ConsumerHistories
  // ) {
  //   const incomeTimeSerieses = Object.values(
  //     consumerHistories
  //   ).map((ch: ConsumerHistory) =>
  //     ch.stats.map((cs: ConsumerStats) => cs.income)
  //   );
  //   const res = this.getAggregateTimeSeries(
  //     incomeTimeSerieses,
  //     numberOfPeriods
  //   );
  //   return res;
  // }

  // public getAverageExpenditures(
  //   consumerHistories: ConsumerHistories,
  //   numberOfConsumersTS: number[],
  //   numberOfPeriods: number
  // ) {
  //   const exp = Object.values(consumerHistories).map((ch: ConsumerHistory) =>
  //     ch.stats.map((cs: ConsumerStats) => cs.expenditures)
  //   );
  //   return this.roundTimeSeries(
  //     this.getAverageTimeSeries(
  //       exp,
  //       numberOfConsumersTS,
  //       numberOfPeriods
  //     ),
  //     4
  //   );
  // }

  /**
   *
   * @param maxIdx length of the @param denominatorSeries by default
   */
  public getAverageTimeSeries(
    tsList: number[][],
    denominatorSeries: number[],
    maxIdx: number = -1
  ) {
    if (maxIdx === -1) {
      maxIdx = denominatorSeries.length;
    }
    const sumSeries = this.getAggregateTimeSeries(tsList, maxIdx);
    return sumSeries.map((sum, i) => sum / denominatorSeries[i]);
  }

  /**
   * Returns a single time series containing the sum of the values in the given time serieses
   * @param tsList a list of time serieses
   */
  public getAggregateTimeSeries(tsList: number[][], maxIdx: number): number[] {
    let aggregatorSeries: number[] = [];
    for (let i = 1; i <= maxIdx; i++) {
      aggregatorSeries.push(0);
    }

    tsList.map(
      (ts) => (aggregatorSeries = this.addVectors(aggregatorSeries, ts))
    );

    return aggregatorSeries;
  }

  // public getAverageUnitPriceTimeSeries(
  //   numberOfPeriods: number,
  //   product: Product,
  //   economyHistory: EconomyHistory,
  //   firmHistories: FirmHistories
  // ) {
  //   let type: AgentType;
  //   let numberOfFirms: number[];
  //   if (product === Product.Beans) {
  //     type = 'BeanFirm';
  //     numberOfFirms = economyHistory.stats.map(
  //       (es: EconomyStats) => es.numberOfBeanFirms
  //     );
  //   } else {
  //     type = 'HashFirm';
  //     numberOfFirms = economyHistory.stats.map(
  //       (es: EconomyStats) => es.numberOfHashFIrms
  //     );
  //   }

  //   const unitPriceTimeSerieses = Object.values(firmHistories)
  //     .filter((fh: FirmHistory) => fh.agent.type === type)
  //     .map((fh) => fh.unitPrice);

  //   let aggregatorSeries: number[] = [];
  //   for (let i = 1; i <= numberOfPeriods; i++) {
  //     aggregatorSeries.push(0);
  //   }

  //   unitPriceTimeSerieses.map(
  //     (upts) => (aggregatorSeries = this.addVectors(aggregatorSeries, upts))
  //   );

  //   const averageUnitPriceTimeSeries = aggregatorSeries.map(
  //     (unitPricePeriodTSum, i) => unitPricePeriodTSum / numberOfFirms[i]
  //   );
  //   return this.roundTimeSeries(averageUnitPriceTimeSeries, 4);
  // }
}
