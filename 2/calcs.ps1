$cx = 100; $cy = 100; $rt = 96; $rb = 82; $rh = 48
$d = @()
for ($i=0; $i -lt 12; $i++) {
    $a = $i * 30
    $a1 = ($a - 8) * [math]::Pi / 180
    $a2 = ($a - 4) * [math]::Pi / 180
    $a3 = ($a + 4) * [math]::Pi / 180
    $a4 = ($a + 8) * [math]::Pi / 180
    
    $x1 = "{0:N2}" -f ($cx + $rb * [math]::Cos($a1))
    $y1 = "{0:N2}" -f ($cy + $rb * [math]::Sin($a1))
    $x2 = "{0:N2}" -f ($cx + $rt * [math]::Cos($a2))
    $y2 = "{0:N2}" -f ($cy + $rt * [math]::Sin($a2))
    $x3 = "{0:N2}" -f ($cx + $rt * [math]::Cos($a3))
    $y3 = "{0:N2}" -f ($cy + $rt * [math]::Sin($a3))
    $x4 = "{0:N2}" -f ($cx + $rb * [math]::Cos($a4))
    $y4 = "{0:N2}" -f ($cy + $rb * [math]::Sin($a4))
    
    if ($i -eq 0) {
        $d += "M $x1,$y1"
    } else {
        $d += "A $rb,$rb 0 0,1 $x1,$y1"
    }
    $d += "L $x2,$y2"
    $d += "A $rt,$rt 0 0,1 $x3,$y3"
    $d += "L $x4,$y4"
}
$xe = "{0:N2}" -f ($cx + $rb * [math]::Cos(-8 * [math]::Pi / 180))
$ye = "{0:N2}" -f ($cy + $rb * [math]::Sin(-8 * [math]::Pi / 180))

$d += "A $rb,$rb 0 0,1 $xe,$ye Z"

$xh1 = "{0:N2}" -f ($cx - $rh)
$xhm1 = "{0:N2}" -f ($cx + $rh)
$d += "M $xhm1,$cy"
$d += "A $rh,$rh 0 1,0 $xh1,$cy"
$d += "A $rh,$rh 0 1,0 $xhm1,$cy Z"

$d -join ' ' | Out-File -FilePath path.txt -Encoding ascii
