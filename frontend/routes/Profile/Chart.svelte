<script type="ts">
    import { Radar } from "svelte-chartjs";

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
    } from "chart.js";

    ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

    export let userData: any[] = [];
    console.log(userData)

    const data = {
        labels: ["Skadnia JS", "Algorytmy", "Analiza kodu"],
        datasets: [
            {
                backgroundColor: "#00FF38",
                borderColor: "#00FF38",
                data: userData,
            },
        ],
    };

    const options = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 2,
            },
        },
        scales: {
            r: {
                grid: {
                    color: "#B3B3B3",
                },
                ticks: {
                    color: "#80A8E4",
                    backdropColor: "rgba(0,0,0,0)",
                },
            },
        },
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        events: [],
    };
</script>

<div class="chart">
    <Radar {data} {options} />
</div>

<style lang="scss">
    .chart {
        height: 100%;
        width: 100%;

        border: _(1) solid #8a8a8a;
        border-radius: _(3);
    }
</style>
