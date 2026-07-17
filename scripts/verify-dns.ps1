# Verify mentoraonline.guru DNS points to Vercel

$apex = "mentoraonline.guru"
$www = "www.mentoraonline.guru"
$expectedA = @("216.198.79.1", "76.76.21.21")

Write-Host "`n=== Mentora DNS Verification ===" -ForegroundColor Cyan
Write-Host ""

function Test-Dns {
    param([string]$Name, [string]$Type)
    try {
        return Resolve-DnsName -Name $Name -Type $Type -ErrorAction Stop
    } catch {
        return $null
    }
}

# Apex A record
Write-Host "Checking $apex (A record)..." -ForegroundColor Yellow
$apexResult = Test-Dns $apex "A"
if ($apexResult) {
    $ips = ($apexResult | Where-Object { $_.Type -eq "A" }).IPAddress
    if ($ips -and ($ips | Where-Object { $_ -in $expectedA })) {
        Write-Host "  OK: $apex -> $($ips -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "  WARN: $apex resolves to $($ips -join ', ') — expected Vercel IP ($($expectedA -join ' or '))" -ForegroundColor Red
    }
} else {
    Write-Host '  FAIL: apex does not resolve (NXDOMAIN). Add A record @ -> 216.198.79.1 in GoDaddy.' -ForegroundColor Red
}

Write-Host ""
Write-Host "Checking $www (CNAME)..." -ForegroundColor Yellow
$wwwResult = Test-Dns $www "CNAME"
if ($wwwResult) {
    $target = ($wwwResult | Where-Object { $_.Type -eq "CNAME" }).NameHost
    if ($target -match "vercel") {
        Write-Host "  OK: $www -> $target" -ForegroundColor Green
    } else {
        Write-Host "  WARN: $www -> $target (expected cname.vercel-dns.com)" -ForegroundColor Red
    }
} else {
    $wwwA = Test-Dns $www "A"
    if ($wwwA) {
        Write-Host "  WARN: $www has A record instead of CNAME — use CNAME www -> cname.vercel-dns.com" -ForegroundColor Red
    } else {
        Write-Host "  FAIL: $www does not resolve. Add CNAME www -> cname.vercel-dns.com in GoDaddy." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Vercel project: mentora (mentora-alpha.vercel.app)" -ForegroundColor Cyan
Write-Host "Next: Vercel Dashboard -> Domains -> Refresh after DNS propagates" -ForegroundColor Cyan
Write-Host ""
