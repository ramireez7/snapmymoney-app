  import { Component, ViewChild, inject } from '@angular/core';
  import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    IonProgressBar,
    IonIcon,
    IonSpinner
  } from '@ionic/angular/standalone';
  import { RouterLink, RouterLinkActive } from '@angular/router';
  import { AuthService } from '../auth/services/auth.service';
  import { User } from '../auth/interfaces/user';
  import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
  import { Transaction } from '../transactions/interfaces/transaction';
  import { Target } from '../targets/interfaces/target';
  import { TransactionService } from '../transactions/services/transaction.service';
  import { TargetService } from '../targets/services/target.service';
  import { TransactionCategoryService } from '../transactionCategories/services/transactionCategory.service';
  import { TargetCategoryService } from '../targetCategories/services/targetCategory.service';
  import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
  import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
  } from 'ng-apexcharts';
  import { TransactionCategory } from '../transactionCategories/interfaces/transactionCategory';

  export type ChartOptions = {
    chart: ApexChart;
    series: ApexAxisChartSeries | any[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    grid: ApexGrid;
    tooltip: ApexTooltip;
    colors: any[];
    labels: any[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    subtitle: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    fill: ApexFill;
    plotOptions: ApexPlotOptions;
  };

  @Component({
    selector: 'home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonButton,
      IonItem,
      IonThumbnail,
      IonLabel,
      IonList,
      IonCard,
      IonCardHeader,
      IonCardContent,
      IonCardTitle,
      IonCardSubtitle,
      IonImg,
      RouterLink,
      RouterLinkActive,
      IonProgressBar,
      CurrencyPipe,
      SlicePipe,
      DatePipe,
      IonIcon,
      NgApexchartsModule,
      IonSpinner,
    ],
  })
  export class HomePage {
    @ViewChild('chart') chart!: ChartComponent;
    public chartOptions: any;

    user!: User;
    #authService = inject(AuthService);
    transactions: Transaction[] = [];
    #transactionsService = inject(TransactionService);
    #transactionCategoryService = inject(TransactionCategoryService);
    targets: Target[] = [];
    #targetsService = inject(TargetService);
    #targetCategoryService = inject(TargetCategoryService);
    percentages: { [key: number]: number } = {};
    thisMonthTransactions: Transaction[] = [];
    thisMonthBalance: number = 0;
    thisMonthExpense: number = 0;
    transactionCategoryAmounts: number[] = [];
    transactionCategoryNames: string[] = [];
    chartConfig: any;
    responsiveConfig: any;

    calculateBalance(transactions: Transaction[]): number {
      let balance = 0;
      transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) ?? 0;
        if (transaction.transaction_type_id === 2) {
          balance += amount;
        } else {
          balance -= amount;
        }
      });
      return balance;
    }

    calculateExpense(transactions: Transaction[]): number {
      let expense = 0;
      transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) ?? 0;
        if (transaction.transaction_type_id === 1) {
          expense += amount;
        }
      });
      return expense;
    }

    ionViewWillEnter() {
      this.chartOptions = {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                },
                value: {
                  show: true,
                },
                total: {
                  show: true,
                },
              },
            },
          },
        },
        series: this.transactionCategoryAmounts,
        chart: {
          type: 'donut',
          height: 350,
        },
        labels: this.transactionCategoryNames,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };

      this.chartConfig = {
        type: 'donut',
        height: 350,
      };

      this.responsiveConfig = [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ];

      this.#authService.getProfile().subscribe((user) => {
        this.user = user;

        this.#targetsService
          .getTargetsByUserId(user.id!)
          .subscribe((targets) => {
            this.targets = targets;
            this.targets.forEach((target) => {
              if (target.target_category_id) {
                this.#targetCategoryService
                  .getTargetCategoryById(target.target_category_id!)
                  .subscribe((targetCategory) => {
                    target.target_category_name = targetCategory.name;
                  });
              }
              this.percentages[target.id!] = parseFloat(
                (
                  (target.current_amount! / target.target_amount!) *
                  100
                ).toFixed(0)
              );
            });
          });

        this.#transactionsService
          .getTransactionsByUserId(user.id!)
          .subscribe((transactions) => {
            this.transactions = transactions;

            const currentDate = new Date();
            const firstDayOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            );
            this.thisMonthTransactions = this.transactions.filter(
              (transaction) => {
                const transactionDate = new Date(transaction.created);
                return (
                  transactionDate >= firstDayOfMonth &&
                  transactionDate <= currentDate
                );
              }
            );

            this.thisMonthBalance = this.calculateBalance(
              this.thisMonthTransactions
            );

            this.thisMonthExpense = this.calculateExpense(
              this.thisMonthTransactions
            );

            this.transactions.forEach((transaction) => {
              if (transaction.transaction_category_id) {
                this.#transactionCategoryService
                  .getTransactionCategoryById(
                    transaction.transaction_category_id!
                  )
                  .subscribe((transactionCategory) => {
                    transaction.transaction_category_name =
                      transactionCategory.name;
                  });
              }
            });

            // Agrupar las transacciones por categoría
            const categoryTotals: { [key: string]: number } = {};
            this.thisMonthTransactions.forEach((transaction) => {
              if (
                transaction.transaction_type_id === 1 &&
                transaction.transaction_category_id
              ) {
                const categoryId = transaction.transaction_category_id;
                const amount = Number(transaction.amount!);
                if (!categoryTotals[categoryId]) {
                  categoryTotals[categoryId] = 0;
                }
                categoryTotals[categoryId] += amount;
              }
            });

            // Obtener las categorías y sus montos
            const categoryIds = Object.keys(categoryTotals);
            this.#transactionCategoryService
              .getTransactionCategories()
              .subscribe((transactionCategories) => {
                transactionCategories.forEach((transactionCategory) => {
                  if (
                    categoryIds.includes(transactionCategory.id!.toString())
                  ) {
                    this.transactionCategoryNames.push(
                      transactionCategory.name!
                    );
                    this.transactionCategoryAmounts.push(
                      categoryTotals[transactionCategory.id!]
                    );
                  }
                });

                // Actualizar las opciones del gráfico
                this.chartOptions.series = this.transactionCategoryAmounts;
                this.chartOptions.labels = this.transactionCategoryNames;
              });
          });
      });
    }

    ionViewWillLeave() {
      this.chartOptions = undefined;
      this.transactionCategoryAmounts = [];
      this.transactionCategoryNames = [];
    }
  }
