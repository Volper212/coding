<script type="ts">
    import { link } from "svelte-routing";

    import api from "frontend/api";
    import { getContext } from "svelte";

    const loginUser = getContext<string>("user");

    let rank: any[] = [];
    let tasks: any[] = [[], [], [], []];
    (async () => {
        const users = await api.getUsers.query();
        users.forEach((user) => {
            rank.push([user.username, user.rating]);
        });

        rank.sort((a, b) => {
            return b[1] - a[1];
        });

        console.log(rank);
        rank[0][2] = 1
        let postion = 2;
        for (let i = 1; i < rank.length; i++) {
            if (i>0 && rank[i-1][1] != rank[i][1])
                rank[i].push(postion);
            else
                rank[i].push(rank[i-1][2]);
            
            postion++;
        }
        console.log(rank);
        rank = rank;

        for (let i = 0; i < 4; i++) {
            const puzzles = await api.getPuzzles.query({type: i, author: loginUser});
            console.log(puzzles);

            puzzles.forEach((puzzle) => {
                tasks[i].push([puzzle.title, puzzle.rating, puzzle.views || 0]);
            });
        }

        tasks = tasks;
    })();

    let titles = [
        "<Znajdź_błąd />",
        "<Napisz_program />",
        "<Uzupełnij_lukę />",
        "<Co_się_wyświetli />",
    ];
</script>

<main>
    <div>
        <div class="title" id="first">Rankingi</div>
        <table>
            <tr>
                <th>Miejsce</th>
                <th>Nick</th>
                <th>Ranking</th>
            </tr>
            {#each rank as user}
                <tr>
                    <td style={user[0] == loginUser ? "color: #00FF38" : ""}>{user[2]}</td>
                    <td style={user[0] == loginUser ? "color: #00FF38" : ""}>{user[0]}</td>
                    <td style={user[0] == loginUser ? "color: #00FF38" : ""}>{user[1]}</td>
                </tr>
            {/each}
        </table>
    </div>
    <div>
        <div class="title">Twoje statystyki</div>
        <div class="stats">
            <div>
                {#if rank.length}
                    <span class="code">
                        Punkty rankingowe: <span class="color"
                            >{rank.filter((user) => user[0] == loginUser)[0][1]}</span
                        >
                    </span>
                    <br />
                    <span class="code">
                        Miejsce w ogólnym rankingu: <span class="color"
                            >{rank.filter((user) => user[0] == loginUser)[0][2]}</span
                        >
                    </span>
                {/if}
            </div>
            <div>Zdjęcie</div>
            <div class="button">
                <a href="/puzzle" use:link><button>Graj dalej</button></a>
            </div>
        </div>
    </div>
    <div>
        <div class="title">
            Twoje zadania <a href="/createPuzzle" use:link><button class="plus">+</button></a>
        </div>
        <div class="tables">
            {#each tasks as task, key}
                <div>
                    <div class="tag">{titles[key]}</div>
                    <table>
                        <tr>
                            <th>Nazwa zadania</th>
                            <th>Ranking zadania</th>
                            <th>Liczba wyświetleń</th>
                        </tr>
                        {#each task as puzzle}
                            <tr>
                                <td>{puzzle[0]}</td>
                                <td>{puzzle[1]}</td>
                                <td>{puzzle[2]}</td>
                            </tr>
                        {/each}
                    </table>
                </div>
            {/each}
        </div>
    </div>
</main>

<style lang="scss">
    @use "../variables.scss" as *;

    main {
        font-size: 0.8vw;
        padding: 0 2vw;
        height: 80vh;
        display: flex;
        justify-content: space-between;

        div {
            .title {
                border-bottom: 0.1vw solid $primary-color;
                width: 100%;
                text-align: center;
                font-size: 1.5vw;
            }

            #first {
                text-align: left;
            }

            .plus {
                padding: 0;
                width: 2.5vw;
                height: 2.5vw;
            }

            .code {
                color: $primary-color;
                .color {
                    color: $secondary-color;
                }
            }

            table {
                color: $primary-color;
                width: 100%;

                th {
                    padding-right: 3vw;
                    padding-bottom: 0.2vw;
                }

                th:last-child {
                    padding-right: 0;
                }

                td:first-child {
                    color: $primary-color;
                }

                td {
                    color: $secondary-color;
                }
            }
        }
    }

    .stats {
        margin-top: 1vw;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tables {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        table {
            margin-left: 1vw;
        }
    }

    .tag {
        margin-bottom: 0.5vw;
    }

    .button {
        text-align: center;
    }
</style>
