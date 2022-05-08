window.addEventListener('load', async () => {
    const host = await new Promise((res) => {
        fetch('/leaderboard-sys/HOST')
        .then((response) => response.text())
        .then((data) => res(data));
    })

    const leaderboard = await new Promise((res) => fetch(`${host}/leaderboard?pass=aiqftw`).then((res) => res.json()).then((data) => res(data)));
    if(leaderboard.error) alert(leaderboard.error);
    leaderboard.reverse();
    leaderboard.sort((a, b) => a.points - b.points)
    leaderboard.reverse();
    console.log(leaderboard);

    leaderboard.forEach((entry, index) => {
        const parent = document.querySelector('.mainContent');
        const html = 
        `<tr class="ee-${entry.name.replaceAll(' ', '_')} hover">
            <th scope="row">${String(index + 1)}</th>
            <th>${entry.name}</th>
            <td>${entry.sabaq}</td>
            <td>${entry.sabaqpara}</td>
            <td>${entry.dour}</td>
            <td>${entry.behaviour}</td>
            <td>${entry.attendance}</td>
            <td>${entry.clothing}</td>
            <td>${entry.points}</td>
        </tr>`;
        
        parent.insertAdjacentHTML('beforeend', html);

        document.querySelector(`.ee-${entry.name.replaceAll(' ', '_')}`)?.addEventListener('click', () => {
            window.location.href = `/profile.html?name=${entry.name}`
        })
    })
})